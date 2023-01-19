import { Cursos } from "./curso.enum";
import { Endereco } from "./endereco.model";


export class Materias {
  id!: string;
  nome!: string;
  cpf!: string;
  email!: string;
  username!: string;
  senha!: string;
  categoria!: Cursos;
  primeiraNota!: number;
  segundaNota!: number;
  mediaFinal!: number;
  cep!: string;
  logradouro!: string;
  bairro!: string;
  localidade!: string;
  numero!: number;
  endereco!: Endereco;
}