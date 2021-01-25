import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private URL = 'https://tallerjdpautos.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient, private router: Router) {}

  search(placa){
    return this.http.get<any>(this.URL + '/car/placa/' + placa); // devuelve un observable
  }

}
