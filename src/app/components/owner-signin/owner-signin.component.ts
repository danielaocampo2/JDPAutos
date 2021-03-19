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
          console.log(res)
          localStorage.setItem('id_owner', res.id);
          let reparacionx = res.reparacionGlobal[0];
          for (let index = 1; index < res.reparacionGlobal.length; index++) {
            for (let j = 0; j < res.reparacionGlobal[index].length; j++) {
              reparacionx.push(res.reparacionGlobal[index][j])
              
            }
            
          }
          localStorage.setItem('reparaciones', JSON.stringify(reparacionx));
          this.router.navigate(['/owner-reparations']);
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
