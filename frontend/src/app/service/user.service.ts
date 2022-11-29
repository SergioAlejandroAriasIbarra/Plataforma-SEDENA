import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private http: HttpClient) { }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  logout() {
    return signOut(this.auth);
  }

  getAllUsers():Promise<any>{
    return this.http.get(environment.apiUrl + "main/getupdate").toPromise();
  }

  addPersona(persona:any):Promise<any>{
    const url = `${environment.apiUrl}main/post`;
    return this.http.post(url,persona).toPromise();
  }

  deletePersona(persona:any):Promise<any>{
    console.log(persona)
    const url = `${environment.apiUrl}main/delete`;
    return this.http.put(url,persona).toPromise();
  }

  getunaUnidad(dato:any):Promise<any>{
    const url = `${environment.apiUrl}main/getunidad1`;
    return this.http.get(url).toPromise();
  }

  getunaUnidad2(dato:any):Promise<any>{
    const url = `${environment.apiUrl}main/getunidad2`;
    return this.http.get(url).toPromise();
  }
}
