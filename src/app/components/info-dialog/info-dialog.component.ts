import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent {
  title = null;
  data = null;
  constructor(
    private readonly dialogRef: MatDialogRef<InfoDialogComponent>,

    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.data=data;
    console.log(this.data["msg"]);
  }

confirm(){
  this.dialogRef.close(true)
}

cancel(){

}

}

