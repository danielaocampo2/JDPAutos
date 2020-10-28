import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { AuthGuard } from './auth.guard'; // pongalo en las rutas que quiera proteger

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
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
