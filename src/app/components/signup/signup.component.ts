import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    /*placa: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([A-Z]{3}[0-9]{3})?$/),
    ]),*/
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
    role: new FormControl('',[
      Validators.required
    ])
  });

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

  get primEmail() {
    return this.validatorGroup.get('email');
  }

  get justNumber() {
    return this.validatorGroup.get('number');
  }

  get placa() {
    return this.validatorGroup.get('placa');
  }

  get name() {
    return this.validatorGroup.get('name');
  }

  get password(){
    return this.validatorGroup.get('password');
  }

  get role(){
    return this.validatorGroup.get('role');
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
