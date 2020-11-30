import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { OwnerService } from '../../services/owner.service';

@Component({
  selector: 'app-owner-refresh-token',
  templateUrl: './owner-refresh-token.component.html',
  styleUrls: ['./owner-refresh-token.component.css']
})
export class OwnerRefreshTokenComponent implements OnInit {
  owner = {
    email: ''
  };
  error = false;
  constructor(private ownerService: OwnerService, private router: Router, private readonly dialog: MatDialog) { }

  ngOnInit(): void { }

  refreshToken() {

    this.ownerService.refreshToken(this.owner).subscribe(
      (res) => {
        if (res.message == 'Fecha de caducidad del token actualizada') {
          this.openDialog(res.message);
          this.error = true;
        }
        else {
          this.error = true;
        }
      },
      (err) => {
        this.error = true
        this.openDialog(err.error.message);
      }
    );
  }

  openDialog(errors) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.data = {
      msg: errors,
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
    },
      (e) => {
        console.error(e);
      });
  }

}
