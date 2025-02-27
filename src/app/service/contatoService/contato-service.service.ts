import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContato } from 'src/app/interfaces/icontato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoServiceService {

  private apiUrl = 'http://localhost:8080/api/contatos'
  constructor(private http : HttpClient) { }

  criarContato(contato: IContato): Observable<IContato> {
    return this.http.post<IContato>(this.apiUrl + "/criar", contato);
  }
}
