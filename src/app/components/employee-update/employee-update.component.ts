import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  text = "Ese correo ya está asociado a otro empleado";

  userID = 536;

  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('',[
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ])
  });

  user = {
    name: '',
    email: '',
    phone: ''
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

  get name() {
    return this.validatorGroup.get('name');
  }

  get phone(){
    return this.validatorGroup.get('phone')
  }

  onSubmit() {
    //console.log(this.user);
    this.authService.update(this.user, this.userID)
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
