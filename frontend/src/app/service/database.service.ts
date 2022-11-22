import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { login } from '../interface/login.interface';
import { user } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }
  URL = "http://localhost:3000/main"


  getAllUsers() {
    return this.http.get<user[]>(this.URL + "/getallusers")
  }
  loginStatus(email: string, password: string) {
    console.log(email)
    console.log(password)
    return this.http.post<any>(this.URL + "/login", { email, password })
  }


}







