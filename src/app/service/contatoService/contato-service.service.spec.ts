import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContatoServiceService } from './contato-service.service';
import { IContato } from 'src/app/interfaces/icontato';
import { TipoContato } from 'src/app/models/tipoContato';

describe('ContatoServiceService', () => {
  let service: ContatoServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContatoServiceService]
    });
    service = TestBed.inject(ContatoServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar um contato', () => {
    const mockContato: IContato = { id: 1, tipoContato: TipoContato.CELULAR, contato: '999999999', pessoaId: 2 };

    service.criarContato(mockContato).subscribe(contato => {
      expect(contato).toEqual(mockContato);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/contatos/criar');
    expect(req.request.method).toBe('POST');
    req.flush(mockContato);
  });

  it('deve obter um contato por ID', () => {
    const mockResponse = { id: 1, tipoContato: TipoContato.CELULAR, contato: '999999999', pessoa: { id: 2 } };
    const expectedContato: IContato = { id: 1, tipoContato: TipoContato.CELULAR, contato: '999999999', pessoaId: 2 };

    service.obterContatoPorId(1).subscribe(contato => {
      expect(contato).toEqual(expectedContato);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/contatos/obterContatoPorId/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve atualizar um contato', () => {
    const mockContato: IContato = { id: 1, tipoContato: TipoContato.TELEFONE, contato: '888888888', pessoaId: 2 };

    service.atualizarContato(mockContato).subscribe(contato => {
      expect(contato).toEqual(mockContato);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/contatos/atualizar/${mockContato.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockContato);
  });

  it('deve listar contatos por pessoaId', () => {
    const mockResponse: IContato[] = [
      { id: 1, tipoContato: TipoContato.CELULAR, contato: '999999999', pessoaId: 2 },
      { id: 2, tipoContato: TipoContato.TELEFONE, contato: '888888888', pessoaId: 2 }
    ];

    service.listarContatosPorPessoa(2).subscribe(contatos => {
      expect(contatos.length).toBe(2);
      expect(contatos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/contatos/pessoa/2');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve excluir um contato', () => {
    service.excluirContato(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/contatos/excluir/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 200, statusText: 'No Content' });
  });
});
