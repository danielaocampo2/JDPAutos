import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private URL = environment.apiUrl;//'http://localhost:3000'; // donde esta el back
  constructor(private http: HttpClient, private router: Router) { }

  create(reparation) {
    return this.http.post<any>(this.URL + '/reparation/create', reparation); // devuelve un observable
  }

  getReparaciones(placa) {
    return this.http.get<any>(this.URL + '/reparation/onplaca/'+placa); // devuelve un observable
  }

  editarReparacion(id,datos) {
    return this.http.put<any>(this.URL + '/reparation/_id/'+id, datos); // devuelve un observable
  }
}
