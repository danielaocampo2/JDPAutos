import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private URL = 'https://tallerjdpautos.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient, private router: Router) { }

  create(reparation) {
    console.log(reparation);
    return this.http.post<any>(this.URL + '/reparation/create', reparation); // devuelve un observable
  }
  signIn(reparation){
    return this.http.post<any>(this.URL + '/auth/logintoken', reparation);
  }

}
