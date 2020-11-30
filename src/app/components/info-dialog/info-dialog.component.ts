import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent {
  data = null;
  constructor(
    private readonly dialogRef: MatDialogRef<InfoDialogComponent>,

    @Inject(MAT_DIALOG_DATA) data

  ) {
    this.data = data;
<<<<<<< HEAD
  }
   
=======
    } 

>>>>>>> a6bda237c1eda64aa3609836a8b20ecf51e5b127
  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {}
}
