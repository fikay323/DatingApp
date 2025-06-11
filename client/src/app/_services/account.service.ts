import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { User } from '../_models/user.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient)
  private router = inject(Router)
  private readonly baseUrl = environment.apiUrl;
  readonly LOCALSTORAGE_KEY = "user"
  currentUser = signal<User | null>(null)

  login = (model: any) => {
    return this.http.post<User>(`${this.baseUrl}account/login`, model).pipe(map(user => {
        localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(user))
        this.currentUser.set(user)
        return user
      }))
  }

  register = (model: any) => {
    return this.http.post<User>(`${this.baseUrl}account/register`, model).pipe(map(user => {
      localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(user))
      this.currentUser.set(user)
      return user
    }))
  }

  logout = () => {
    localStorage.removeItem(this.LOCALSTORAGE_KEY)
    this.currentUser.set(null)
    this.router.navigateByUrl('/')
  }

}