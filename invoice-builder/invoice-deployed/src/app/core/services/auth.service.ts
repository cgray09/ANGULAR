import { Injectable } from '@angular/core';
import { User, LoginRsp, SignupRsp, LogoutRsp } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(
      'https://mean-invoice-builder.herokuapp.com/api/users/login',
      body
    );
  }
  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(
      'https://mean-invoice-builder.herokuapp.com/api/users/signup',
      body
    );
  }
  googleAuth(): Observable<LoginRsp> {
    return this.httpClient.get<LoginRsp>('https://mean-invoice-builder.herokuapp.com/api/auth/google');
  }
  isAuthenticated(token: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      })
    };
    return this.httpClient.get<boolean>(
      'https://mean-invoice-builder.herokuapp.com/api/auth/authenticate',
      httpOptions
    );
  }
  logOut(): Observable<LogoutRsp> {
    return this.httpClient.get<LogoutRsp>('https://mean-invoice-builder.herokuapp.com/api/auth/logout');
  }
  forgotPassword(data: {email: string}) : Observable<{message: string}> {
    return this.httpClient.post<{message: string}>(`${environment.api_url}/users/forgot-password`,data);
  }
  resetPassword(body: any) : Observable<{success: boolean}>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' :'application/json',
        'Authorization': `bearer ${body.token}`
      })
    }
    return this.httpClient.put<{success: boolean}>(`${environment.api_url}/users/reset-password`,
    {password: body.password},
    httpOptions)
  }
}
