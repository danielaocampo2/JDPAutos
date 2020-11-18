import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'https://tallerjdpautos.herokuapp.com'; // donde esta el back
  constructor(private http: HttpClient,
              private router:Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/user', user); // devuelve un observable
  }
  signIn(user){
    return this.http.post<any>(this.URL + '/auth/login', user);
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
