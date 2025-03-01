import { TipoContato } from "../models/tipoContato";
import { IPessoa } from "./ipessoa";

export interface IContato {
  id: number;
  tipoContato: TipoContato;
  contato: string;
  pessoaId: number;
}
