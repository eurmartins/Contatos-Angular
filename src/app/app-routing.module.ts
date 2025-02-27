import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarPessoaComponent } from './pages/pessoa/cadastrar-pessoa/cadastrar-pessoa.component';
import { ListarPessoaComponent } from './pages/pessoa/listar-pessoa/listar-pessoa.component';
import { EditarPessoaComponent } from './pages/pessoa/editar-pessoa/editar-pessoa.component';
import { CadastrarContatoComponent } from './pages/contato/cadastrar-contato/cadastrar-contato.component';

const routes: Routes = [
  {
    path: 'cadastrar-pessoa', component: CadastrarPessoaComponent
  },
  {
    path: 'listar-pessoa', component : ListarPessoaComponent
  },
  {
    path: 'editar-pessoa/:id', component : EditarPessoaComponent
  },
  {
    path : 'editar-pessoa', component : EditarPessoaComponent
  },
  {
    path : 'cadastrar-contato', component : CadastrarContatoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
