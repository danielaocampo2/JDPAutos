import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { OwnerRegisterComponent } from './components/owner-register/owner-register.component';
import { OwnerSigninComponent } from "./components/owner-signin/owner-signin.component";
import {RegisterVehicleComponent} from './components/register-vehicle/register-vehicle.component';
import {EmployeeUpdateComponent} from './components/employee-update/employee-update.component';

import { AuthGuard } from './guards/auth.guard'; // pongalo en las rutas que quiera proteger
import { SupervisorGuard } from './guards/supervisor.guard'; // pongalo en las rutas que quiera proteger
import { AdminGuard } from './guards/admin.guard'; // pongalo en las rutas que quiera proteger

const routes: Routes = [
  //Ruta inicial
  {
    path:'',
    redirectTo:'/team',
    pathMatch:'full'
  },
  {
    path:'team',
    component:TasksComponent
  },
  { // necesita autenticación
    path:'private',
    component:PrivateTasksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent,
    canActivate: [AuthGuard,AdminGuard] 
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'owner-register',
    component:OwnerRegisterComponent,
    canActivate: [AuthGuard,SupervisorGuard]
  },
  {
    path:'owner-signin',
    component:OwnerSigninComponent
  },

  { // necesita autenticación para registrar vehiculo
    path:'register-vehicle',
    component:RegisterVehicleComponent,
    canActivate:[AuthGuard, SupervisorGuard]
  },
  { // necesita autenticación para registrar vehiculo
    path:'employee-update',
    component:EmployeeUpdateComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
