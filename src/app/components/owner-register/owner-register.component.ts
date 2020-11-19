import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.component.html',
  styleUrls: ['./owner-register.component.css'],
})
export class OwnerRegisterComponent implements OnInit {
  title = 'email-validation';
  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    placa: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([A-Z]{3}[0-9]{3})?$/),
    ]),
  });

  owner = {
    vehicle: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get primEmail() {
    return this.validatorGroup.get('email');
  }

  get justNumber() {
    return this.validatorGroup.get('number');
  }

  get placa() {
    return this.validatorGroup.get('placa');
  }

  signUp() {
    console.log('Ya');
  }

  /*signUp() {
    this.authService
      .signUp(this.owner)
      // la respuesta que me da el servidor
      .subscribe(
        (res) => {
          console.log(res);
          // guarde token en el local storage
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        },
        (err) => console.log(err)
      );
  }*/
}
