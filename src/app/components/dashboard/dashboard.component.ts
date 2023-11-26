import { Component,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private auth: AuthService){}

  @Input() roles!:[Role];

ngOnInit():void{
this.auth.getAllRoles()
.subscribe({
  next: (res) => {        
    this.roles = res.data;           
  },
  error: (err) => {
    alert(err?.error.message);
  }
})

}

  logOut()
  {
    this.auth.logout();
  }
}
