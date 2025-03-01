import { TestBed } from '@angular/core/testing';
import { PessoaService } from './pessoa.service';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PessoaService', () => {
  let service: PessoaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PessoaService]
    });
    service = TestBed.inject(PessoaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar uma pessoa', () => {
    const dummyPessoa: IPessoa = { nome: 'João', endereco: 'Rua A', cep: '12345-678', cidade: 'São Paulo', uf: 'SP' };

    service.criarPessoa(dummyPessoa).subscribe(pessoa => {
      expect(pessoa).toEqual(dummyPessoa);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/pessoa/criar');
    expect(req.request.method).toBe('POST');
    req.flush(dummyPessoa);
  });

  it('deve listar todas as pessoas', () => {
    const dummyPessoas: IPessoa[] = [
      { id: 1, nome: 'João', endereco: 'Rua A', cep: '12345-678', cidade: 'São Paulo', uf: 'SP' },
      { id: 2, nome: 'Maria', endereco: 'Rua B', cep: '98765-432', cidade: 'Rio de Janeiro', uf: 'RJ' }
    ];

    service.listarPessoas().subscribe(pessoas => {
      expect(pessoas.length).toBe(2);
      expect(pessoas).toEqual(dummyPessoas);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/pessoa/listar');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPessoas);
  });

  it('deve buscar uma pessoa por ID', () => {
    const dummyPessoa: IPessoa = { id: 1, nome: 'João', endereco: 'Rua A', cep: '12345-678', cidade: 'São Paulo', uf: 'SP' };

    service.procurarPorId(1).subscribe(pessoa => {
      expect(pessoa).toEqual(dummyPessoa);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/pessoa/procurarPorId/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPessoa);
  });

  it('deve atualizar uma pessoa', () => {
    const updatedPessoa: IPessoa = { id: 1, nome: 'Carlos', endereco: 'Rua C', cep: '11111-111', cidade: 'Curitiba', uf: 'PR' };

    service.atualizarPessoa(1, updatedPessoa).subscribe(pessoa => {
      expect(pessoa).toEqual(updatedPessoa);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/pessoa/atualizar/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPessoa);
  });

  it('deve excluir uma pessoa', () => {
    service.excluirPessoa(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/pessoa/excluir/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 200, statusText: 'OK' });
  });
});
