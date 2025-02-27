import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CadastrarPessoaComponent,
    ListarPessoaComponent,
    CardWelcomeComponent,
    EditarPessoaComponent,
    CadastrarContatoComponent
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
