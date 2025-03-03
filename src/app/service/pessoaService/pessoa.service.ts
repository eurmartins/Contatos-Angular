import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPessoa } from '../../interfaces/ipessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/api/pessoa';

  constructor(private http: HttpClient) { }

  criarPessoa(pessoa: IPessoa): Observable<IPessoa> {
    return this.http.post<IPessoa>(this.apiUrl + "/criar", pessoa);
  }

  listarPessoas(): Observable<IPessoa[]> {
    return this.http.get<IPessoa[]>(this.apiUrl + "/listar");
  }

  procurarPorId(id: number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.apiUrl}/procurarPorId/${id}`);
  }

  atualizarPessoa(id: number, pessoa: IPessoa): Observable<IPessoa> {
    return this.http.put<IPessoa>(`${this.apiUrl}/atualizar/${id}`, pessoa);
  }
  excluirPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/excluir/${id}`);
  }
}
