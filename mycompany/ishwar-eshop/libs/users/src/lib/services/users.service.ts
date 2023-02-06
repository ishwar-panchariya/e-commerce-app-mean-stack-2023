import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUser = environment.apiUrl + 'users'

  constructor(private http: HttpClient) { 
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  // Get User List
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUser)
  }

  // Get User by Id
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUser}/${userId}`)
  }

  // Create a new User
  createUser(User: User): Observable<User> {
    return this.http.post<User>(this.apiURLUser, User)
  }

  // update existing User
  updateUser(User: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUser}/${User.id}`, User)
  }

  // delete existing User
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUser}/${userId}`)
  }

  // Get Countries List
  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  // Get countries name for User list 
  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
}
