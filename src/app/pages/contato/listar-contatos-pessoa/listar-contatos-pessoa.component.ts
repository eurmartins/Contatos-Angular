import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ContatoServiceService } from 'src/app/service/contatoService/contato-service.service';
import { IContato } from 'src/app/interfaces/icontato';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-contatos-pessoa',
  templateUrl: './listar-contatos-pessoa.component.html',
  styleUrls: ['./listar-contatos-pessoa.component.scss']
})
export class ListarContatosPessoaComponent {
  pessoaId: number = 0;
  contatos: IContato[] = [];
  mensagemErro: string = '';

  constructor(private contatoService: ContatoServiceService,
    private router : Router
  ) {}

  buscarContatos() {
    if (this.pessoaId > 0) {
      this.contatoService.listarContatosPorPessoa(this.pessoaId).subscribe({
        next: (dados) => {
          this.contatos = dados;
          this.mensagemErro = '';
          console.log(dados);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Nenhum contato encontrado para essa pessoa.',
            background: '#333',
            color: '#fff'
          });
          this.contatos = [];
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Por favor, insira um ID válido.',
        background: '#333',
        color: '#fff'
      });
      this.contatos = [];
    }
  }

  editarContato(contato : IContato): void {
      this.router.navigate(['/editar-contato', contato.id]);
    }

  excluirContato(id: number) {
    console.log("ID enviado para exclusão:", id);
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'ID inválido para exclusão.',
        background: '#333',
        color: '#fff'
      });
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      background: '#333',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contatoService.excluirContato(id).subscribe({
          next: () => {
            this.contatos = this.contatos.filter(contato => contato.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Excluído!',
              text: 'O contato foi removido com sucesso.',
              background: '#333',
              color: '#fff'
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Erro ao excluir o contato.',
              background: '#333',
              color: '#fff'
            });
          }
        });
      }
    });
  }
}
