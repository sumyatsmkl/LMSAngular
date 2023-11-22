import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{ValidateForm} from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Enumbase } from 'src/app/common/enumbase';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,
    private router : Router, private toastr : ToastrService,private spinner:NgxSpinnerService){}
  
  ngOnInit():void{
  this.signUpForm=this.fb.group({
    fullName:['', Validators.required],
    userName:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],  
    idNo:['', Validators.required],
    idType:['84EB7887-053B-4039-AAAD-25F2254B27E0', Validators.required],
    roleId:['D2139701-D03D-4E5E-BD67-76F12813D778',Validators.required]
    
  })
  }

  hideShowPass(){
  this.isText=!this.isText;
  this.isText?this.eyeIcon = "fa-eye":this.eyeIcon="fa-eye-slash";
  this.isText?this.type="text":this.type="password";
  
  }

  onSignup(){
    if (this.signUpForm.valid) {   
   /** spinner starts on init */
  this.spinner.show();

  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 1000);

      this.auth.singUp(this.signUpForm.value)
        .subscribe({
          next:(res)=>{    
            var statusCode = res.code;                   
            if(statusCode == Enumbase.Register_Success.toString())
            {              
              this.toastr.success(res.message);
               this.signUpForm.reset();
               this.router.navigate(['login']);   
            }         
            else{              
              this.toastr.warning(res.message);
            }
             
          },
          error: (err) => {
            this.toastr.error(err.message);
          }
        })
      }
  
    
    else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
