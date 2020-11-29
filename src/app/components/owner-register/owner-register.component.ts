import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

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
     /*placa: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([A-Z]{3}[0-9]{3})?$/),
    ]),*/
    numberCC: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    name: new FormControl('', [
      Validators.required
    ])
  });

  owner = {
    id_owner:'',
    name: '',
    //surname: '',
    email: '',
    phone: '',
    //password:''
  };

  constructor(private ownerService: OwnerService, private router: Router, private readonly dialog: MatDialog) {}

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

  get justNumberCC() {
    return this.validatorGroup.get('numberCC');
  }

  get name() {
    return this.validatorGroup.get('name');
  }

  get role() {
    return this.validatorGroup.get('role');
  }

  submit() {
    this.ownerService
      .signUp(this.owner)
      // la respuesta que me da el servidor
      .subscribe(
        (res) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/private']);
            console.log("Hola");
          // guarde token en el local storage
        },
        (err) => {
             if(err["error"]["message"] == "El usuario ya existe"){
                this.openDialog();               
             } 
            else{
            console.log(err);
          }
         
        }
      );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      msg: "El usuario ya existe",
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
  },
  (e) => {
      console.error(e);
  });
  }
}
