import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'https://web12test.herokuapp.com/api'; // donde esta el back
  constructor(private http: HttpClient,
              private router:Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user); // devuelve un observable
  }
  signIn(user){
    return this.http.post<any>(this.URL + '/signin', user);
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
