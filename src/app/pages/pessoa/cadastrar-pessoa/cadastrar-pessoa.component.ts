import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/service/cep/cep.service';
import { PessoaService } from 'src/app/service/pessoaService/pessoa.service';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import Swal from 'sweetalert2';

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
    if (!this.pessoa.nome.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'O campo Nome é obrigatório!',
        color: '#fff',
        background: '#333'
      });
      return;
    }

    if (this.pessoa.uf) {
      this.pessoa.uf = this.pessoa.uf.toUpperCase();
    }

    this.pessoaService.criarPessoa(this.pessoa).subscribe({
      next: (response) => {
        console.log('Pessoa cadastrada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Pessoa cadastrada com sucesso!',
          background: '#333',
          color: '#fff'
        });
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao cadastrar pessoa:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao cadastrar pessoa! Tente novamente!',
          background: '#333',
          color: '#fff'
        });
      }
    });
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
            Swal.fire({
              icon: 'warning',
              title: 'Atenção!',
              text: 'CEP não encontrado. Tente novamente!',
              background: '#333',
              color: '#fff'
            });
          }
        },
        error: (err) => {
          this.carregando = false;
          console.error('Erro ao buscar endereço:', err);
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao buscar endereço.',
            background: '#333',
            color: '#fff'
          });
        }
      });
    }
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
