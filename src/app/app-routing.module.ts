import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarPessoaComponent } from './pages/pessoa/cadastrar-pessoa/cadastrar-pessoa.component';
import { ListarPessoaComponent } from './pages/pessoa/listar-pessoa/listar-pessoa.component';

const routes: Routes = [
  {
    path: 'cadastrar-pessoa', component: CadastrarPessoaComponent
  },
  {
    path: 'listar-pessoa', component : ListarPessoaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
