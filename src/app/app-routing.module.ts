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
import {OwnerRefreshTokenComponent} from './components/owner-refresh-token/owner-refresh-token.component';
import {RepairComponent} from "./components/repair/repair.component";
import { VehicleComponent } from "./components/vehicle/vehicle.component";

import { AuthGuard } from './guards/auth.guard'; // pongalo en las rutas que quiera proteger
import { SupervisorGuard } from './guards/supervisor.guard'; // pongalo en las rutas que quiera proteger
import { AdminGuard } from './guards/admin.guard'; // pongalo en las rutas que quiera proteger
import { EmpleadoGuard } from './guards/empleado.guard'; // pongalo en las rutas que quiera proteger
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { AdminEmployeeComponent } from './components/admin-employee/admin-employee.component';

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
    canActivate:[AuthGuard, EmpleadoGuard]
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
  { 
    path:'change-password',
    component: CambiarPasswordComponent
  },
 
  { // necesita autenticación para registrar vehiculo
    path:'register-vehicle',
    component:RegisterVehicleComponent,
    canActivate:[AuthGuard, SupervisorGuard]
  },
  { // necesita autenticación para registrar vehiculo
    path:'employee-update',
    component:EmployeeUpdateComponent,
    canActivate:[AuthGuard, EmpleadoGuard]
  },
  { // necesita autenticación para registrar vehiculo
    path:'refresh-token',
    component:OwnerRefreshTokenComponent,
    canActivate: [AuthGuard,SupervisorGuard]
  },
  {
    path:'create-repair',
    component:RepairComponent,
    canActivate: [AuthGuard, SupervisorGuard]
  },
  {
    path:'edit-employ',
    component:AdminEmployeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'vehicle',
    component: VehicleComponent,
    canActivate: [AuthGuard, SupervisorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
