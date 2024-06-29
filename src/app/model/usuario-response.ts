import { Departamento } from "./departamento";

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  departamento: Departamento;
}
