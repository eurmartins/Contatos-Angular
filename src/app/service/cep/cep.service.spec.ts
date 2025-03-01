import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CepService } from './cep.service';

describe('CepService', () => {
  let service: CepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CepService]
    });

    service = TestBed.inject(CepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve buscar o endereço pelo CEP', () => {
    const mockResponse = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP'
    };

    const cep = '01001000';

    service.buscarEndereco(cep).subscribe((endereco) => {
      expect(endereco).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://viacep.com.br/ws/${cep}/json/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
