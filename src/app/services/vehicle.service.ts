import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'; // Importa la configuración


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  //'https://tallerjdpautos.herokuapp.com'
  private URL = environment.apiUrl; //'http://localhost:3000'; // donde esta el back
  constructor(private http: HttpClient, private router: Router) {}

  search(placa){
    return this.http.get<any>(this.URL + '/car/placa/' + placa); // devuelve un observable
  }

  crearVehiculo(datos){
    return this.http.post<any>(this.URL + '/car/create' , datos); // devuelve un observable
  }

}
