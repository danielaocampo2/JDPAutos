import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent implements OnInit {
  vehicle = {
    placa: '',
    ownerId: '',
    marca: '',
    modelo: '',
    dateIn: ''

  };
  constructor() { }

  ngOnInit(): void {
  }

  registerVehicle() {
    console.log(this.vehicle);
    
    
  }

}
