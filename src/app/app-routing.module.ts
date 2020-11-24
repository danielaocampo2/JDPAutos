import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import {RegisterVehicleComponent} from './components/register-vehicle/register-vehicle.component'

import { AuthGuard } from './auth.guard'; // pongalo en las rutas que quiera proteger

const routes: Routes = [
  //Ruta inicial
  {
    path:'',
    redirectTo:'/tasks',
    pathMatch:'full'
  },
  {
    path:'tasks',
    component:TasksComponent
  },
  { // necesita autenticación
    path:'private',
    component:PrivateTasksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },

  { // necesita autenticación para registrar vehiculo
    path:'register-vehicle',
    component:RegisterVehicleComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
