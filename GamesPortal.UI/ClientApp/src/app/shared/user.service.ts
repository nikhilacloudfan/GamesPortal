import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  userDataSource: BehaviorSubject<any> = new BehaviorSubject(null);
  numberOfUsers: BehaviorSubject<number> = new BehaviorSubject(0);

  userData = this.userDataSource.asObservable();
  usersCount = this.numberOfUsers.asObservable();

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseURI = environment.baseURI;

  formModel = this.fb.group({
    UserName: ['',[Validators.required,Validators.minLength(3),Validators.pattern("^[A-Za-z0-9_-]{3,16}$")]],
    Email: ['', Validators.email],
    FullName: [''],
    Role: '',
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$")]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  })

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    }

    return this.http.post(this.baseURI + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.baseURI + '/ApplicationUser/Login', formData);
  }

  resetPassword(formData) {
    return this.http.post(this.baseURI + '/ApplicationUser/ResetPassword', formData);
  }

  getUserProfile() {
    return this.http.get(this.baseURI + '/UserProfile');
  }

  getAllUsers() {
    return this.http.get(this.baseURI + '/UserProfile/GetAllusers');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payload.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }


  updateUserData(data){
    this.userDataSource.next(data);
  }

  updateUsersCount(count){
    this.numberOfUsers.next(count);
  }
}
