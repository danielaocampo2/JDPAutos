import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';

import { AuthGuard } from './guards/auth.guard'; // agreguelo en providers
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OwnerRegisterComponent } from './components/owner-register/owner-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OwnerSigninComponent } from './components/owner-signin/owner-signin.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { RegisterVehicleComponent } from './components/register-vehicle/register-vehicle.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

import {ImageUploadModule} from 'angular2-image-upload';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    TasksComponent,
    PrivateTasksComponent,
    OwnerRegisterComponent,
    OwnerSigninComponent,
    InfoDialogComponent,
    RegisterVehicleComponent,
    EmployeeUpdateComponent,
    UploadFileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    ImageUploadModule.forRoot()
    

  ],
  providers: [
    AuthGuard,
    { // Petiones van a tener una cabecera extra
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
