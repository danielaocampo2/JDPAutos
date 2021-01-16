import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  user = {
    email: ''
  };
  error = false;
  errorPass = false
  data = {
    password: "",
    token: ""
  }
  pass2 = ""
  habBoton = true
  constructor(private empleadoService: EmpleadoService, private router: Router, private readonly dialog: MatDialog) { }

  ngOnInit(): void { }

  getForm() {
    if (localStorage.getItem('hjkas') == 'pñl') { return true }
    else { return false }
  }
  cambiarForm() {
    localStorage.removeItem('hjkas');
  }

  verificarPass() {
    if (this.pass2 != "") {
      if (this.data.password == this.pass2) {
        this.errorPass = false;
      }
      else {
        this.errorPass = true
      }
      if (this.data.token != "" && this.errorPass == false) {
        this.habBoton = false
      }
      else {
        this.habBoton = true
      }
    } else {
      this.errorPass = false;
      this.habBoton = true;
    }

  }
  cambiarPass() {
    this.empleadoService.cambiarContraseña(this.data, localStorage.getItem('plsas').toString()).subscribe(
      (res) => {
        if (res.message == 'Contraseña Actualizada') {
          this.openDialog(res.message);
          this.error = true;
          localStorage.removeItem('hjkas');
          localStorage.removeItem('plsas');
          this.router.navigate(['/signin']);
        }
        else {
          this.error = true;
        }
      },
      (err) => {
        console.log(err)
        this.error = true
        this.openDialog(err.error.message);
      }
    );
  }

  enviarCorreo() {

    this.empleadoService.correoRecuperarContraseña(this.user).subscribe(
      (res) => {
        if (res.message == 'Correo enviado con exito') {
          this.openDialog(res.message);
          this.error = true;
          localStorage.setItem('hjkas', 'pñl');
          this.empleadoService.getEmpleado2(this.user.email).subscribe(
            (res) => {
              localStorage.setItem('plsas',res.users[0].id_user);
            },
            (err) => {
              console.log(err)
            });
              
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
    let carita = errors == 'Correo enviado con exito' ? ":)" : ":(";
    if(errors == "Contraseña Actualizada"){
      carita = ":)"
    }
    dialogConfig.data = {
      title: carita,
      msg: errors
    };

    this.dialog.open(InfoDialogComponent, dialogConfig).afterClosed().subscribe((success) => {
    },
      (e) => {
        /* console.error(e); */
      });
  }

}
