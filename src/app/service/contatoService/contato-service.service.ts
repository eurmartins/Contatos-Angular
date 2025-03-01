import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContato } from 'src/app/interfaces/icontato';
import { Observable } from 'rxjs';
import { TipoContato } from 'src/app/models/tipoContato';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatoServiceService {

  private apiUrl = 'http://localhost:8080/api/contatos'
  constructor(private http : HttpClient) { }

  criarContato(contato: IContato): Observable<IContato> {
    return this.http.post<IContato>(this.apiUrl + '/criar', contato);
  }

  obterContatoPorId(id: number): Observable<IContato> {
    return this.http.get<any>(`${this.apiUrl}/obterContatoPorId/${id}`).pipe(
      map((response) => {
        const contato: IContato = {
          id: response.id,
          tipoContato: response.tipoContato,
          contato: response.contato,
          pessoaId: response.pessoa.id
        };
        return contato;
      })
    );
  }

  atualizarContato(contato: IContato): Observable<IContato> {
    return this.http.put<IContato>(`${this.apiUrl}/atualizar/${contato.id}`, contato);
  }

  listarContatosPorPessoa(pessoaId: number): Observable<IContato[]> {
    return this.http.get<IContato[]>(`${this.apiUrl}/pessoa/${pessoaId}`).pipe(
      map((response) =>
        response.map((contato) => ({
          id: contato.id,
          tipoContato: contato.tipoContato,
          contato: contato.contato,
          pessoaId: contato.pessoaId
        }))
      )
    );
  }


  excluirContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/excluir/${id}`);
  }
}
