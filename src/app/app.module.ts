import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Swal from 'sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CadastrarPessoaComponent } from './pages/pessoa/cadastrar-pessoa/cadastrar-pessoa.component';
import { ListarPessoaComponent } from './pages/pessoa/listar-pessoa/listar-pessoa.component';
import { CardWelcomeComponent } from './components/card-welcome/card-welcome.component';
import { EditarPessoaComponent } from './pages/pessoa/editar-pessoa/editar-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarContatoComponent } from './pages/contato/cadastrar-contato/cadastrar-contato.component';
import { EditarContatoComponent } from './pages/contato/editar-contato/editar-contato.component';
import { ListarContatosPessoaComponent } from './pages/contato/listar-contatos-pessoa/listar-contatos-pessoa.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardWelcomeComponent,
    CadastrarPessoaComponent,
    EditarPessoaComponent,
    ListarPessoaComponent,
    CadastrarContatoComponent,
    EditarContatoComponent,
    ListarContatosPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
