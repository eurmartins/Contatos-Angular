import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/service/pessoaService/pessoa.service';
import { HttpClient } from '@angular/common/http';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})
export class ListarPessoaComponent implements OnInit {

  pessoas: IPessoa[] = [];
  filtroNome: string = '';
  filtroId: string = '';

  constructor(private pessoaService: PessoaService) {}

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
    console.log("Editar pessoa:", pessoa);
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
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.excluirPessoa(id).subscribe({
          next: () => {
            Swal.fire("Excluído!", "A pessoa foi excluída com sucesso.", "success");
            this.carregarPessoas(); // Atualiza a lista
          },
          error: (err) => {
            Swal.fire("Erro!", "Erro ao excluir pessoa: " + err.message, "error");
          }
        });
      }
    });
  }
}
