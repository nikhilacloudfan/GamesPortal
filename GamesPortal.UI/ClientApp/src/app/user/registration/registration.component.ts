import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration Successfull');
          this.router.navigateByUrl('/user/login');
        }else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('User Name is already taken', 'Registration failed');
                break;
            
              default:
                this.toastr.error(element.description, 'Registration failed');
                break;
            }                    
            
          });
        }

      },
      err =>{
        console.log(err);
      }
    )
  }

}
