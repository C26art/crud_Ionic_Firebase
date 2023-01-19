import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from '@angular/fire/auth';
import { Login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  async register(login: Login) {
    try{
    const user = await createUserWithEmailAndPassword(
      this.auth,
       login.email,
       login.senha             
       );
       return user;
    } catch (e) {
      return null;
    }
  }
  

  async login (login: Login) {
      try{
        const user = await signInWithEmailAndPassword(
      this.auth,
       login.email,
       login.senha
       );
       return user;
    } catch (e) {
      return null;
    }
  }  

  logout() {
    return signOut(this.auth);
  }
}
