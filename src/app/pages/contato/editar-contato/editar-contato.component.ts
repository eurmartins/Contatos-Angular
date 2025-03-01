import { Component, OnInit } from '@angular/core';
import { IContato } from 'src/app/interfaces/icontato';
import { ContatoServiceService } from 'src/app/service/contatoService/contato-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.scss']
})
export class EditarContatoComponent implements OnInit {

  contatoForm: FormGroup;
  idBusca: number = 0;
  isEditing = false;
  contato: IContato | null = null;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.contatoForm = this.fb.group({
      tipoContato: [null, Validators.required],
      contato: ['', Validators.required],
      pessoaId: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idBusca = +params['id'];
      if (this.idBusca) {
        this.buscarContato();
      }
    });
  }

  buscarContato(): void {
    if (this.idBusca) {
      this.contatoService.obterContatoPorId(this.idBusca).subscribe(
        (contato) => {
          console.log('Contato retornado do backend:', contato);
          this.contato = contato;
          this.contatoForm.patchValue({
            tipoContato: contato.tipoContato,
            contato: contato.contato,
            pessoaId: contato.pessoaId,
          });
          this.isEditing = false;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Contato não encontrado!',
            background: '#333',
            color: '#fff'
          });
        }
      );
    }
  }

  enableEditing(): void {
    this.isEditing = true;
    this.contatoForm.get('pessoaId')?.enable();
  }

  attContato(): void {
    if (this.contatoForm.valid && this.contato) {
      const updatedContato: IContato = {
        ...this.contato,
        ...this.contatoForm.value,
        id: this.contato.id
      };

      this.contatoService.atualizarContato(updatedContato).subscribe(
        (contatoAtualizado) => {
          this.contato = contatoAtualizado;
          this.isEditing = false;
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Contato atualizado com sucesso!',
            background: '#333',
            color: '#fff'
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao atualizar o contato.',
            background: '#333',
            color: '#fff'
          });
        }
      );
    }
  }
}
