import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  error = false;
  msgTitle = '';
  msg = '';

  vehicle = {
    placa: '',
    date_in: '',
    status: '',
    id_owner: '',
    marca: '',
    model: '',
    color: '',
  };

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.vehicleService.search(this.vehicle.placa).subscribe(
      (res) => {
        this.error = false;
        console.log(res.cars[0].date_in);
        this.vehicle.placa = res.cars[0].placa;
        this.vehicle.date_in = res.cars[0].date_in;
        this.vehicle.status = res.cars[0].status;
        this.vehicle.id_owner = res.cars[0].id_owner;
        this.vehicle.marca = res.cars[0].marca;
        this.vehicle.model = res.cars[0].model;
        this.vehicle.color = res.cars[0].color;
        this.openDialog();
        //console.log(res);
        /* if(res.message=="accedido"){
          this.error=false;
          localStorage.setItem('mirol', res.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem('myId',res.id);
          
          this.router.navigate(['/private']);

        }
          else{
            this.error=true;
          } */
      },
      (err) => {
        this.error = true;
        this.openDialog();
      }
    );
  }

  openDialog() {
    console.log(this.error);
    if (this.error == false) {
      this.msgTitle = 'Correcto';
      this.msg = `Placa: ${this.vehicle.placa}<br>
                  Color: ${this.vehicle.color}<br>
                  Fecha: ${this.vehicle.date_in}<br>
                  Estado: ${this.vehicle.status}<br>
                  Propietario: ${this.vehicle.id_owner}<br>
                  Marca: ${this.vehicle.marca}<br>
                  Modelo: ${this.vehicle.model}<br>
                 `
    } else {
      this.msgTitle = 'El carro no se encuentra registrado';
      this.msg = ':/'
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';

    dialogConfig.data = {
      title: this.msgTitle,
      msg: this.msg
    };

    this.dialog
      .open(InfoDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(
        (success) => {},
        (e) => {
          console.error(e);
        }
      );
  }
}
