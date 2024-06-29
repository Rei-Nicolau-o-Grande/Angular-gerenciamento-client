import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UsuarioRequest } from '../../model/usuario-request';
import { Observable, tap } from 'rxjs';
import { UsuarioResponse } from '../../model/usuario-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private API_URL = `${environment.api}/api/v1/usuarios`;

  public createUser(request: UsuarioRequest): Observable<UsuarioRequest> {
    return this.http.post<UsuarioRequest>(this.API_URL, request)
  }

  public updateUser(request: UsuarioRequest): Observable<UsuarioRequest> {
    return this.http.put<UsuarioRequest>(`${this.API_URL}/${request.id}`, request)
  }

  public getUser(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.API_URL}/${id}`)
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
  }

  public listUsers(nome: string): Observable<{content: UsuarioResponse[]}> {
    return this.http.get<{content: UsuarioResponse[]}>(`${this.API_URL}`, { params: { nome } })
  }
}
