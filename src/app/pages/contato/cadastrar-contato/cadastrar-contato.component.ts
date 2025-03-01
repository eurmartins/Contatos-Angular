import { Component } from '@angular/core';
import { IContato } from 'src/app/interfaces/icontato';
import { ContatoServiceService } from 'src/app/service/contatoService/contato-service.service';
import { TipoContato } from 'src/app/models/tipoContato';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-contato',
  templateUrl: './cadastrar-contato.component.html',
  styleUrls: ['./cadastrar-contato.component.scss']
})
export class CadastrarContatoComponent {

  contato: IContato = {
    id: 0,
    tipoContato: TipoContato.CELULAR,
    contato: '',
    pessoaId: 0
  };

  TipoContato = TipoContato;
  tipoContatoOpcoes = Object.keys(TipoContato)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ key, value: TipoContato[key as keyof typeof TipoContato] }));

  constructor(private contatoService: ContatoServiceService) {}

  onSubmit() {
    this.contatoService.criarContato(this.contato).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Contato cadastrado!',
          text: 'O contato foi cadastrado com sucesso.',
          background: '#333',
          color: '#fff',
          confirmButtonText: 'OK'
        });
        this.limparFormulario();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar!',
          text: 'Ocorreu um erro ao tentar cadastrar o contato.',
          background: '#333',
          color: '#fff',
          confirmButtonText: 'Tentar novamente'
        });
        console.error('Erro:', err);
      }
    });
  }

  limparFormulario() {
    this.contato = {
      id: 0,
      tipoContato: TipoContato.TELEFONE,
      contato: '',
      pessoaId: 0
    };
  }
}
