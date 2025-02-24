import { PessoaService } from 'src/app/service/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/ipessoa';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit {

  pessoa: IPessoa = {
    nome: '',
    endereco: '',
    cep: '',
    cidade: '',
    uf: ''
  };

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {}

  onSubmit(): void {  // Alterado de IPessoa para void
    this.pessoaService.criarPessoa(this.pessoa).subscribe({
      next: (response) => {
        console.log('Pessoa cadastrada:', response);
        alert('Pessoa cadastrada com sucesso!');
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao cadastrar pessoa:', err);
        alert('Erro ao cadastrar pessoa: ' + err.message);
      }
    });
  }

  limparFormulario(): void {
    this.pessoa = {
      nome: '',
      endereco: '',
      cep: '',
      cidade: '',
      uf: ''
    };
  }
}
