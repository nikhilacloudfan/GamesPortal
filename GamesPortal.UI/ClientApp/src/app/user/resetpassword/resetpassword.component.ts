import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from '../../shared/popup.service';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  formModel={
    UserName:'',
    Password:'',
    ConfirmPassword:''
  }

  constructor(
    private popupService: PopupService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
  }

  cancel() {
    this.resetForm();
    this.popupService.closeModal('resetpassword');
  }

  resetPassword(form: NgForm){
    this.userService.resetPassword(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token', res.token);
        this.resetForm();
        this.cancel();
        this.toastr.success('Password has been changed successfully');        
      },
      err => {
        if(err.status == 400){
          this.toastr.error('Incorrect Username or Password', 'Reset Password failed');
        }else{
          console.log(err);
        }
      }
    );
  }

  resetForm() {
    this.formModel = {
      UserName: '',
      Password: '',
      ConfirmPassword: ''
    };
  }

}
