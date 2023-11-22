import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LMSAngular';

  constructor(private toastr:ToastrService
 
  ){}

  ngOnInit():void{

  }
showToaster(){
  this.toastr.success("Hello, This is LMS Angular App.")
}
}
