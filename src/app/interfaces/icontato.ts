import { TipoContato } from "../models/tipoContato";

export interface IContato {
  tipoContato: TipoContato;
  contato: string;
  pessoaId: number;
}
