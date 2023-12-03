import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import{ValidateForm} from 'src/app/helpers/validateform';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Enumbase } from 'src/app/common/enumbase';
import { NgxSpinnerService } from 'ngx-spinner';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  accessToken:string ="";
  type:string = "password";
isText:boolean=false;
eyeIcon:string="fa-eye-slash"
loginForm!: FormGroup;
constructor(private fb:FormBuilder, private auth: AuthService, private router: Router, 
  private toastr : ToastrService,private spinner:NgxSpinnerService){
    localStorage.removeItem('token');
  }

ngOnInit():void{
  
  this.loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    idNo :['', ],
    email:['', ]  
  })
}
hideShowPass(){
this.isText=!this.isText;
this.isText?this.eyeIcon = "fa-eye":this.eyeIcon="fa-eye-slash";
this.isText?this.type="text":this.type="password";
}

onLogin(){
  if (this.loginForm.valid) {
    console.log(this.loginForm.value)

  /** spinner starts on init */
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 5000);

    this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res) => {        
         
          var statusCode = res.code;                   
            if(statusCode == Enumbase.Login_Success.toString())
            {  
              this.toastr.success(res.message);
              var tokenExpiration = res.tokenExpired;
              var tokenValue = res.accessToken;
              this.auth.setTokenV2(tokenValue,tokenExpiration);  
              this.router.navigate(['/dashboard']);   
            }
            else{              
              this.toastr.warning(res.message);
            }
        },
        error: (err) => {          
          this.toastr.error(err?.error.message);
        }
      })
  }
  else {
    ValidateForm.validateAllFormFields(this.loginForm);
  }
}
private getNowUTC() {
  const now = new Date();
  return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
}

}
