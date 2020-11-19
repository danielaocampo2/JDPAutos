import { Component, OnInit } from '@angular/core';
// importar el servicio
import { AuthService } from  '../../services/auth.service';
// para navegar
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    email:'',
    password:''
  };
  error=false;
  constructor(private authService: AuthService,
               private router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
      .subscribe(
        res =>{
          //console.log(res);
          if(res.message=="accedido"){
          this.error=false;
          localStorage.setItem('token', res.token)
          this.router.navigate(['/private']);

        }
          else{
            this.error=true;
          }

        },
        err =>this.error=true
      )


  }

}
