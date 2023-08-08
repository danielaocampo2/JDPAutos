import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private URL = environment.apiUrl; //'http://localhost:3000'; // donde esta el back
  constructor(private http: HttpClient,
              private router:Router) { }

  getEmpleado(userId){
    return this.http.get<any>(this.URL + '/user/id_user/'+userId); // devuelve un observable
  }

  getEmpleado2(email){
    return this.http.get<any>(this.URL + '/user/email/'+email); // devuelve un observable
  }
  update(user, userID){
    return this.http.put<any>(this.URL + '/user/id_user/'+ userID, user);
  }

  correoRecuperarContraseña(email) {
    return this.http.post<any>(this.URL + '/user/password/recuperar', email);
  }

  cambiarContraseña(datos,id) {
    return this.http.put<any>(this.URL + '/user/password/id_user/'+id, datos);
  }
  getAll(){
    return this.http.get<any>(this.URL + '/user/showWorkers/'); // devuelve un observable
  }

  desactivar(id){
    let datos = {}
    return this.http.put<any>(this.URL + '/user/desactivar/id_user/'+id,datos); // devuelve un observable
  }
  activar(id){
    let datos = {}
    return this.http.put<any>(this.URL + '/user/activar/id_user/'+id,datos); // devuelve un observable
  }
}
