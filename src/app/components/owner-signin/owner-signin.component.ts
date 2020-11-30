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
  text = "El token ha caducado"
  owner = {
    token: ''
  };
  error = false;
  constructor(private ownerService: OwnerService, private router: Router, private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  signIn() {
    this.ownerService.signIn(this.owner).subscribe(
      (res) => {
        if (res.message == 'accedido') {
          this.error = false;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private']);
        } else if(res.message == this.text){
          this.openDialog("");
        }
        else {
          this.error = true;
        }
      },
      (err) => {this.error = true
           this.openDialog(err);    
      }
    );
  }

  openDialog(errors) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px'; 
    dialogConfig.data = {

      msg: errors.error.message,
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
  },
  (e) => {
      console.error(e);

  });
  }
}
