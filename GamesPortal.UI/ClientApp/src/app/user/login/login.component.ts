import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel={
    UserName:'',
    Password:''
  }

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.decideRoute(localStorage.getItem('token'));
    } else {
      this.router.navigateByUrl('/user/login');
    }
  }

  onSubit(form: NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        this.decideRoute(res.token);
      },
      err => {
        if(err.status == 400){
          this.toastr.error('Incorrect Username or Password', 'Authentication failed');
        }else{
          console.log(err);
        }
      }
    );
  }

  decideRoute(token) {
    localStorage.setItem('token', token);
    var payload = JSON.parse(window.atob(token.split('.')[1]));
    var userRole = payload.role;
    if (userRole === "Admin") {
      this.router.navigateByUrl('/adminpanel');
    } else if (userRole === "Customer") {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/forbidden');
    }
  }


}
