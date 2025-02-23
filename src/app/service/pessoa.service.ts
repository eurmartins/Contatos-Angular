import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/api/pessoa';

  constructor(private http: HttpClient) { }

  criarPessoa(pessoa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/criar", pessoa);
  }
}
