import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, generate, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {  
  routeURL: string;
  constructor(private authService: AuthService, private router: Router, private toastr : ToastrService) {
    this.routeURL = this.router.url;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>{  
    var generatedToken = this.authService.getToken();     
    let expiredDate: any = this.authService.getTokenExpired();    
     var currentUTCDateTime = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en','+0000');    
     if(generatedToken!=null && expiredDate > currentUTCDateTime) {  
         request = request.clone({
             setHeaders: {
                 Authorization: `Bearer ${generatedToken}`
             }
         });
     }

    return next.handle(request).pipe(
      catchError((err:any)=>{
         if(err instanceof HttpErrorResponse){
           if(err.status === 401){
            if(generatedToken){
              alert(generatedToken);
              request = request.clone({
                setHeaders: {Authorization:`Bearer ${generatedToken}`}  // "Bearer "+myToken
              })
            }                    
           }
         }
         return throwError(()=> err)
      })
    );
  }
}
