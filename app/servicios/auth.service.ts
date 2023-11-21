import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Palabra, Users, Usuario, igenerarQR, ialumnosPresentes, ialumnosPresentesId } from '../pages/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpclient: HttpClient) { }

  CrearUsuario(newUsuario: Usuario):Observable<Usuario>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  mostrarRegistrados():Observable<Usuario>{
    return this.httpclient.get<Usuario>(`${environment.apiUrl}/registros`)
  }

  //Obtenemos todos los usuarios
  GetAllUsers():Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios`);
  }

  //Obtenemos un usuario por medio de su email
  GetUserById(codigo: any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?email=${codigo}`);
  }

  IsLogged(){
    return sessionStorage.getItem('email')!=null;
  }

  GetName(){
    return sessionStorage.getItem("nombre");
  }

  logout() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userrole");
    sessionStorage.removeItem("ingresado");
  }

  CrearPalabra(newPalabra:Palabra):Observable<Palabra>{
    return this.httpclient.post<Palabra>(`${environment.apiUrl}/palabras`, newPalabra);
  }

  BuscarUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  ActualizarUsuario(usuario:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }
}
