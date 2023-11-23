import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{ValidateForm} from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Enumbase } from 'src/app/common/enumbase';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from 'src/app/models/role';
import { SystemCodeValue } from 'src/app/models/systemCodeValue';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  selectedRoleId:string = "";
  selectedIDType:string="";
  isLearnerChecked:Boolean = false;
  isLecturerChecked :Boolean = false;

  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,
    private router : Router, private toastr : ToastrService,private spinner:NgxSpinnerService){}
  
    @Input() roles!:[Role];
    @Input() idTypes!:[SystemCodeValue];

  ngOnInit():void{
  this.getAllowSelfRegisterRoles();
  this.getIdTypes();

  this.signUpForm=this.fb.group({
    fullName:['', Validators.required],
    userName:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],  
    idNo:['', Validators.required],
    idType: [this.selectedIDType,Validators.required],
    roleId:[this.selectedRoleId,Validators.required]
    
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

  getSelectedRole(event:any){ 
    this.selectedRoleId = event.target.value;     
  }

  getSelectedIDType(event:any){ 
    this.selectedIDType = event.target.value;     
  }

  getAllowSelfRegisterRoles(){
    this.auth.getAllowSelfRegisterRoles()
      .subscribe({
        next: (res) => {        
          this.roles = res.data; 
          console.log(this.roles);         
        },
        error: (err) => {
          alert(err?.error.message);
        }
      })
  }

  getIdTypes(){    
    this.auth.getSystemValuesByCodeTypeId(Number(Enumbase.CodeTypeIDType.toString()))
      .subscribe({
        next: (res) => {        
          this.idTypes = res.data; 
          console.log(this.idTypes);         
        },
        error: (err) => {
          alert(err?.error.message);
        }
      })
  }

}
