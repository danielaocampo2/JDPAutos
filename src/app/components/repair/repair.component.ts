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

  text = "no existe el carro en la DB";

  validatorGroup = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,11}$/),
    ]),
    name: new FormControl('', [
      Validators.required
    ])
  });

  reparacion = {
    placa: '',
    precio: '',
    detalles: ''
  };

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

  onSubmit() {
    this.repairService.create(this.reparacion)
    // la respuesta que me da el servidor
      .subscribe(
        res =>{
          // guarde token en el local storage
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
      title: ":(",
      msg: this.text,
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
  },
  (e) => {
      console.error(e);
  });
  }

}
