import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'https://pure-ravine-06656.herokuapp.com/api'
  constructor(private http: HttpClient) { }

  getTeam(){
    return  this.http.get<any>(this.URL + '/team');
  }

  getPrivateTasks(){
    return  this.http.get<any>(this.URL + '/private-tasks');
  }
}
