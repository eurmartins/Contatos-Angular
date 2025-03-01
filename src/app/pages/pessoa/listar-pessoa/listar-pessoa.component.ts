import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/service/pessoaService/pessoa.service';
import { HttpClient } from '@angular/common/http';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})
export class ListarPessoaComponent implements OnInit {

  pessoas: IPessoa[] = [];
  filtroNome: string = '';
  filtroId: string = '';

  constructor(private pessoaService: PessoaService, private router : Router) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.listarPessoas().subscribe(data => {
      this.pessoas = data;
    });
  }

  get pessoasFiltradas(): IPessoa[] {
    return this.pessoas.filter(pessoa =>
      (this.filtroNome ? pessoa.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) : true) &&
      (this.filtroId ? pessoa.id !== undefined && pessoa.id.toString().includes(this.filtroId) : true)
    );
  }

  voltarPesquisa(): void {
    this.filtroNome = '';
    this.filtroId = '';
  }

  editarPessoa(pessoa: IPessoa): void {
    this.router.navigate(['/editar-pessoa', pessoa.id]);
  }

  excluirPessoa(id: number | undefined): void {
    if (id === undefined) return;

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: '#333',
      color: '#fff',
      confirmButtonText: "Excluir!",
      cancelButtonText: "Cancelar."
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.excluirPessoa(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Excluído!",
              text: "A pessoa foi excluída com sucesso.",
              icon: "success",
              background: '#333',
              color: '#fff'
            });
            this.carregarPessoas();
          },
          error: (err) => {
            Swal.fire({
              title: "Erro!",
              text: "Erro ao excluir pessoa: " + err.message,
              icon: "error",
              background: '#333',
              color: '#fff'
            });
          }
        });
      }
    });
  }
}
