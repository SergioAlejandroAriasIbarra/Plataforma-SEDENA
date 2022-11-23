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

}
