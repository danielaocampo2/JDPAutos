import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent implements OnInit {
  
  validatorGroup = new FormGroup({
    
    id_owner: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    placa: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([A-Z]{3}[0-9]{3})?$/),
    ]),
    marca: new FormControl('', [
      Validators.required
    ]),
    modelo: new FormControl('', [
      Validators.required
    ]),
    color: new FormControl('', [
      Validators.required
    ]),
    dateIn: new FormControl('', [
      Validators.required
    ])

  });
  
  text = "";
  vehicle = {
    placa: '',
    id_owner: '',
    marca: '',
    model: '',
    color:"",
    dateIn: ''

  };
  constructor(private vehicleService: VehicleService,
    private router:Router,
    private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get marca() {
    return this.validatorGroup.get('marca');
  }

  get justId() {
    return this.validatorGroup.get('id_owner');
  }

  get placa() {
    return this.validatorGroup.get('placa');
  }

  get color() {
    return this.validatorGroup.get('color');
  }

  get modelo() {
    return this.validatorGroup.get('modelo');
  }

  get dateIn() {
    return this.validatorGroup.get('dateIn');
  }


  registerVehicle() {
    this.vehicleService.crearVehiculo(this.vehicle)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          this.text = res.message; 
             this.openDialog(0)
        },
        err => {
          this.text = err.error.message; 
          this.openDialog(1) }//err
    )
    console.log(this.vehicle);
    
    
  }

  openDialog(error) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      title: error== 1?":(":":)",
      msg: this.text,
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
  },
  (e) => {
      console.error(e);
  });
  }
}
