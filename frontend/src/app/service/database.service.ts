import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  URL = "http://localhost:3000/main"
  
  GetPersonal(){
    return this.http.get(this.URL + "/getpersonal")
  }


}
