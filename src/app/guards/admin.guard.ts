import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) { }

  public canActivate() {
    let rol = localStorage.getItem('mirol');
    /* console.log(rol); */
    if (rol != "admin") {
      this.router.navigate(['/']); //Lo enviamos a la página que queramos
      return false;
    }
    return true;
  }
  
}
