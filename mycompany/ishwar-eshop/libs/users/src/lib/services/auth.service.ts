import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environment/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiURLUser = environment.apiUrl + 'users'

  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private router: Router) {  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUser}/login`, { email, password });
  }

  logout() {
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
