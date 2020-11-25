import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

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
  
  
  vehicle = {
    placa: '',
    id_owner: '',
    marca: '',
    modelo: '',
    color:"",
    dateIn: ''

  };
  constructor() { }

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
    console.log(this.vehicle);
    
    
  }

}
