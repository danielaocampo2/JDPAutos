import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.apiUrl;//'http://localhost:3000'; // donde esta el back
  constructor(private http: HttpClient,
              private router:Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/user', user); // devuelve un observable
  }
  signIn(user){
    return this.http.post<any>(this.URL + '/auth/login', user);
  }
  /* update(user, userID){
    return this.http.put<any>(this.URL + '/user/id_user/'+ userID, user);
  } */
  loggedIn() {
    if(localStorage.getItem('token')||localStorage.getItem('id_owner') ){
      return true;}
    }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('id_owner');
    localStorage.removeItem('token');
    localStorage.removeItem('mirol');
    localStorage.removeItem('myId');
    localStorage.clear();
    this.router.navigate(['./signin'])
  }

}
