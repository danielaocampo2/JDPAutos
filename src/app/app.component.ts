import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public authService: AuthService){}
   

   public mirol(){
    let mirol = localStorage.getItem('mirol');
    return mirol;
   }

   public myId(){
     let usuario = localStorage.getItem('myId')
     return usuario;
   }
   
}
