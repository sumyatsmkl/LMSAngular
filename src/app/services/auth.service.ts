import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl: string = "http://localhost:5185/api";

  constructor(private http : HttpClient) { }

  singUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/profile/register`,userObj);
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/profile/login`,loginObj);
  }

  getAllowSelfRegisterRoles(){
    return this.http.get<any>(`${this.baseUrl}/role/getAllowRegisterRoles`);
  }

  getSystemValuesByCodeTypeId(codeTypeId:number){
    return this.http.get<any>(`${this.baseUrl}/setup/getAllByCodeTypeId/`+ codeTypeId);
  }
}
