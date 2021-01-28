import { Component, OnInit } from '@angular/core';
import { RepairService } from '../../services/repair.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  text = "";

  validatorGroup = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    name: new FormControl('', [
      Validators.required
    ])
  });

  validadorPlaca = new FormGroup({
    placaCampo: new FormControl('', [
      Validators.required,
    ])
  });
  placaEditar = ''

  datos = {
    estado: "",
    detalles: "",
    precio: ""
  }
  reparacion = {
    placa: '',
    precio: '',
    detalles: ''
  };

  reparaciones = []
  repaMostrar = []
  constructor(
    private repairService: RepairService,
    private router:Router,
    private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get name() {
    return this.validatorGroup.get('name');
  }

  get justNumber() {
    return this.validatorGroup.get('number');
  }

  get placaCampo() {
    return this.validadorPlaca.get('placaCampo');
  }
  onSubmit() {
    this.repairService.create(this.reparacion)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          // guarde token en el local storage
          this.reparacion.detalles = '';
          this.reparacion.placa = '';
          this.reparacion.precio = '';
          this.text = res.message; 
          this.openDialog(0)
        },
        err => this.openDialog(1) //err
    )
  }

  buscarReparaciones(){
    this.repairService.getReparaciones(this.placaEditar)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          this.repaMostrar = []
          this.reparaciones = []
          // guarde token en el local storage
          this.reparaciones = res.rreparations;
          this.repaMostrar.push(this.reparaciones[0])
        },
        err => {
          this.text = err.error.message; 
          this.repaMostrar = []
          this.reparaciones = []
          this.openDialog(1) }//err
    )
  }

  actualizarReparacion(id,estado,precio,detalles){
    this.datos.detalles = detalles;
    this.datos.estado = estado;
    this.datos.precio = precio;

    this.repairService.editarReparacion(id,this.datos)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          // guarde token en el local storage
             this.buscarReparaciones()
             this.text = res.message; 
             this.openDialog(0)
        },
        err => {
          this.text = err.error.message; 
          this.openDialog(1) }//err
    )
    
  }
  onPageChange($event) {
    this.repaMostrar =  this.reparaciones.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
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
