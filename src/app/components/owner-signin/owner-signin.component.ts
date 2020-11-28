import { Component, OnInit } from '@angular/core';
// importar el servicio
import { OwnerService } from '../../services/owner.service';
// para navegar
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-owner-signin',
  templateUrl: './owner-signin.component.html',
  styleUrls: ['./owner-signin.component.css'],
})
export class OwnerSigninComponent implements OnInit {
  showError = 0;
  correct = 0;
  text = "El token ha caducado"
  owner = {
    // email: '',
    token: ''
  };
  error = false;
  constructor(private ownerService: OwnerService, private router: Router, private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  signIn() {
    this.showError=0;
    this.ownerService.signIn(this.owner).subscribe(
      (res) => {
        //console.log(res);
        if (res.message == 'accedido') {
          this.error = false;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        } else if(res.message == this.text){
          this.openDialog();
        }
        else {
          this.error = true;
        }
      },
      (err) => {this.error = true
        this.showError = this.showError+1;
         if (this.showError==1) {
           this.openDialog(); 
          console.log(err);
        }         
      }
    );
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
