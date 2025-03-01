import { TipoContato } from "../models/tipoContato";

export interface IContato {
  id: number;
  tipoContato: TipoContato;
  contato: string;
  pessoaId: number;
}
