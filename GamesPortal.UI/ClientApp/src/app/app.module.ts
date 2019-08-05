import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { PopupService } from './shared/popup.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForiddenComponent } from './foridden/foridden.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';
import { ScModalModule } from 'angular-5-popup';
import { ManageusersComponent } from './admin-panel/manageusers/manageusers.component';
import { CreatecharacterComponent } from './admin-panel/createcharacter/createcharacter.component';
import { CharacterService } from './shared/character.service';
import { DesigncharacterComponent } from './home/designcharacter/designcharacter.component';
import { ShowCharacterComponent } from './admin-panel/manageusers/show-character/show-character.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForiddenComponent,
    ResetpasswordComponent,
    ManageusersComponent,
    CreatecharacterComponent,
    DesigncharacterComponent,
    ShowCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScModalModule,
    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers: [UserService, PopupService, CharacterService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
