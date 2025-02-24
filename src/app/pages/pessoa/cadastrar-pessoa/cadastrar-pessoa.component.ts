import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/service/cep/cep.service';
import { PessoaService } from 'src/app/service/pessoaService/pessoa.service';
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

  carregando = false;

  constructor(
    private pessoaService: PessoaService,
    private cepService: CepService
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
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

  preencherEnderecoPorCep(): void {
    if (this.pessoa.cep && this.pessoa.cep.length === 8) {
      this.carregando = true;
      this.cepService.buscarEndereco(this.pessoa.cep).subscribe({
        next: (dados) => {
          this.carregando = false;
          if (dados && !dados.erro) {
            this.pessoa.endereco = dados.logradouro;
            this.pessoa.cidade = dados.localidade;
            this.pessoa.uf = dados.uf;
          } else {
            alert('CEP não encontrado.');
          }
        },
        error: (err) => {
          this.carregando = false;
          console.error('Erro ao buscar endereço:', err);
          alert('Erro ao buscar endereço.');
        }
      });
    }
  }
}
