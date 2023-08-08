import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private URL = environment.apiUrl; //'http://localhost:3000'; // donde esta el back
  constructor(private http: HttpClient, private router: Router) {}

  signUp(owner) {
    return this.http.post<any>(this.URL + '/owner/', owner); // devuelve un observable
  }
  signIn(owner){
    return this.http.post<any>(this.URL + '/auth/logintoken', owner);
  }
  refreshToken(email){
    return this.http.post<any>(this.URL + '/owner/refreshToken', email);
  }
  loggedIn() {
    //if(localStorage.getItem('token')){
      //return true;
      return !!localStorage.getItem('token');
    }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['./signin'])
  }
}
