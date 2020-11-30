import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  text = "El empleado ya existe. Revisa por favor la cédula o el correo electrónico asociado a él";

  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    role: new FormControl('',[
      Validators.required
    ]),
    phone: new FormControl('',[
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ])
  });

  user = {
    id_user: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    role: ''

  };

  constructor(
    private authService: AuthService,
    private router:Router,
    private readonly dialog: MatDialog) { }

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

  get phone(){
    return this.validatorGroup.get('phone')
  }

  onSubmit() {
    this.authService.signUp(this.user)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          // guarde token en el local storage
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        },
        err => this.openDialog() //err
    )
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      msg: this.text,
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
  },
  (e) => {
      console.error(e);
  });
  }

}
