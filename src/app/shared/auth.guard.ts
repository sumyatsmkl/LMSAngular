import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {  
  routeURL: string;
  constructor(private authService: AuthService, private router: Router, private toastr : ToastrService) {   
    this.routeURL = this.router.url;
  }  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
 
    return new Promise((resolve, reject) => {
      var test = this.authService.IsLoggedIn();
     if(this.authService.IsLoggedIn() ){   
       this.routeURL = this.router.url;         
       return resolve(true);
      }
     else{
      if (this.routeURL !== '/login') {
        this.toastr.warning("Please login first!");        
        this.routeURL = '/login';      
        this.router.navigate(['/login']);
        return resolve(false);
      }
     }
  });
}
}