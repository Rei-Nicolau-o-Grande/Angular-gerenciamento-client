import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Departamento } from '../../model/departamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private http = inject(HttpClient);
  private API_URL = `${environment.api}/api/v1/departamentos`;

  public createDepartamento(request: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.API_URL, request)
  }

  public updateDepartamento(request: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.API_URL}/${request.id}`, request)
  }

  public getDepartamento(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.API_URL}/${id}`)
  }

  public deleteDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
  }

  public listDepartamentos(nome: string): Observable<{content: Departamento[]}> {
    return this.http.get<{content: Departamento[]}>(`${this.API_URL}`, { params: { nome } })
  }

}
