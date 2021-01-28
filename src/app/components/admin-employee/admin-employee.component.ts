import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css'],
})
export class AdminEmployeeComponent implements OnInit {
  text = '';

  validatorGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    role: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
  });

  empleados = []
  empleadosMostrar = []
  datos = {
    phone: "",
    email: "",
    name: ""
  }

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.empleadoService.getAll()
      // la respuesta que me da el servidor
      .subscribe(
        res => {
          this.empleados = []
          this.empleadosMostrar = []
          // guarde token en el local storage
          this.empleados = res.users;
          this.empleadosMostrar.push(this.empleados[0])
        },
        err => {
          this.text = err.error.message;
          this.empleados = []
          this.empleadosMostrar = []
          this.openDialog(1)
        }//err
      )
  }

  onPageChange($event) {
    this.empleadosMostrar = this.empleados.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
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


  get role() {
    return this.validatorGroup.get('role');
  }

  get phone() {
    return this.validatorGroup.get('phone');
  }

  onSubmit() {

  }
  actualizarEmpleado(id, name, phone, email, state) {
    this.datos.email = email
    this.datos.phone = phone
    this.datos.name = name
    if(state == "Desactivado"){
    this.empleadoService.desactivar(id)
      // la respuesta que me da el servidor
      .subscribe(
        res => {
        },
        err => { }
      )
    }
    if(state == "Activado"){
      this.empleadoService.activar(id)
      // la respuesta que me da el servidor
      .subscribe(
        res => {
        },
        err => { }
      )
    }
    this.empleadoService.update(this.datos, id)
      // la respuesta que me da el servidor
      .subscribe(
        res => {
          // guarde token en el local storage
          this.text = res.message;
          this.openDialog(0)
        },
        err => {
          this.text = err.error.message;
          this.openDialog(1)
        }//err
      )

  }
  openDialog(error) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      title: error == 1 ? ":(" : ":)",
      msg: this.text,
    };


    this.dialog
      .open(InfoDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(
        (success) => { },
        (e) => {
          console.error(e);
        }
      );
  }
}
