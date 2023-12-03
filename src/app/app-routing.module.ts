import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { BodyComponent } from './components/body/body.component';
import { ManageuserComponent } from './components/manageuser/manageuser.component';
import { SetupComponent } from './components/setup/setup.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuardService } from './shared/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login', component: LoginComponent} ,
  {path:'signup', component: SignupComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuardService]},
  {path:'home', component: HomeComponent},
  {path:'body', component: BodyComponent},
  {path:'manageuser', component: ManageuserComponent},
  {path:'setup', component: SetupComponent},
  {path:'sidenav', component: SidenavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
