import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    id_user: '',
    email: '',
    password: '',
    role: ''

  };

  constructor(
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  signUp() {
    //console.log(this.user);
    this.authService.signUp(this.user)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
         //console.log(res)
          // guarde token en el local storage
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        },
        err => console.log("Hay un error 500") //err
    )
  }

}
