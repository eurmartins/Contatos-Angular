import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContatosPessoaComponent } from './listar-contatos-pessoa.component';

describe('ListarContatosPessoaComponent', () => {
  let component: ListarContatosPessoaComponent;
  let fixture: ComponentFixture<ListarContatosPessoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarContatosPessoaComponent]
    });
    fixture = TestBed.createComponent(ListarContatosPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
