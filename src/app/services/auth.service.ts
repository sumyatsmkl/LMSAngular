import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl: string = "http://localhost:5185/api";

  constructor(private http : HttpClient,private router:Router) { }

  singUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/profile/register`,userObj);
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/profile/login`,loginObj);
  }

  logout(){
    localStorage.clear();   
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiredDate');
    this.router.navigate(['/login']); 
  }

  getAllowSelfRegisterRoles(){
    return this.http.get<any>(`${this.baseUrl}/role/getAllowRegisterRoles`);
  }

  getAllRoles(){
    return this.http.get<any>(`${this.baseUrl}/role/getAllRoles`);
  }

  getSystemValuesByCodeTypeId(codeTypeId:number){
    return this.http.get<any>(`${this.baseUrl}/setup/getAllByCodeTypeId/`+ codeTypeId);
  }

  setTokenV2(tokenValue:string,expiredDate:any){   
    localStorage.setItem('token',tokenValue);   
    localStorage.setItem('tokenExpiredDate', expiredDate);  
  }

  setTokenV1(tokenValue:string){   
    localStorage.setItem('token',tokenValue);    
  }
  getToken(){
    return localStorage.getItem('token');
  }

  getTokenExpired(){
    return localStorage.getItem('tokenExpiredDate');
  }

  IsLoggedIn():boolean{    
    return !!localStorage.getItem('token');
  }
}
