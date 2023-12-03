import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'LMSAngular';
  isSideNavCollapsed = false;
  screenWidth = 0; 

  constructor(private authService: AuthService) {
    this.validateIsLogin();   
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  validateIsLogin():boolean{   
    var accessToken = this.authService.getToken(); 
    let isLogIn :boolean = false;      
    if(accessToken == null)
    {
      isLogIn = false;
    }
    else{
      isLogIn = true;
    }   
    return isLogIn;
  }
 
}
