import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
// añade globalmente el formato de token
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  // req toma la info de cada peticion y añade mas (cabecera)
  intercept(req,next){
    const tokeninzeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokeninzeReq);
   }

}
