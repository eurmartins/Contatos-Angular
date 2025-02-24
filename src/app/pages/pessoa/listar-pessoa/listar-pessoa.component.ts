import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/service/pessoa.service';
import { HttpClient } from '@angular/common/http';



interface Pessoa {
  id: number;
  nome: string;
  endereco?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
}

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})

export class ListarPessoaComponent implements OnInit {

  pessoas: Pessoa[] = [];
  filtro: string = '';

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.listarPessoas().subscribe(data => {
      this.pessoas = data;
    });
  }

  get pessoasFiltradas(): Pessoa[] {
    return this.pessoas.filter(pessoa =>
      pessoa.nome.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  voltarPesquisa(): void {
    this.filtro = '';
  }
}
