import { Injectable } from '@angular/core';

const TOKEN = 'token'
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  setToken(data) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
