import { PessoaService } from 'src/app/service/pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit{


  pessoa = {
    nome: '',
    endereco: '',
    cep: '',
    cidade: '',
    uf: ''
  };

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.pessoaService.criarPessoa(this.pessoa).subscribe({
      next: (response) => {
        console.log('Pessoa cadastrada:', response);
        alert('Pessoa cadastrada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao cadastrar pessoa:', err);
        alert('Erro ao cadastrar pessoa: ' + err);
      }
    });
  }
}
