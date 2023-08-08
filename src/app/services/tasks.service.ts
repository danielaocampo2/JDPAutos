import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Importa la configuración

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = `${environment.apiUrl}/user`; //'http://localhost:3000/user';
  constructor(private http: HttpClient) { }

  getTeam(){
    return  this.http.get<any>(this.URL + '/team');
  }

  getPrivateTasks(){
    return  this.http.get<any>(this.URL + '/private-tasks');
  }
}
