import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from 'src/app/service/pessoa.service';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.scss']
})
export class EditarPessoaComponent{

  pessoaForm: FormGroup;
  isEditing = false;
  idBusca: number = 0;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {
    this.pessoaForm = this.fb.group({
      nome: [''],
      endereco: [''],
      cep: [''],
      cidade: [''],
      uf: ['']
    });
  }

  buscarPessoa(): void {
    if (!this.idBusca) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Digite um ID válido!',
      });
      return;
    }

    this.pessoaService.procurarPorId(this.idBusca).subscribe({
      next: (data: IPessoa) => {
        if (data && Object.keys(data).length > 0) {
          this.pessoaForm.patchValue(data);
          this.isEditing = false;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Pessoa não encontrada!',
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível buscar a pessoa. Verifique o ID ou tente novamente mais tarde.',
        });
      }
    });
  }

  enableEditing(): void {
    this.isEditing = true;
  }
  savePessoa(): void {
    this.pessoaService.atualizarPessoa(this.idBusca, this.pessoaForm.value).subscribe(() => {
      this.isEditing = false;
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Pessoa atualizada com sucesso!',
        confirmButtonColor: '#3085d6',
      });
    });
  }
}


