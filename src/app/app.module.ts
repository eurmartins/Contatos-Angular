import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CadastrarPessoaComponent } from './pages/pessoa/cadastrar-pessoa/cadastrar-pessoa.component';
import { ListarPessoaComponent } from './pages/pessoa/listar-pessoa/listar-pessoa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CadastrarPessoaComponent,
    ListarPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
