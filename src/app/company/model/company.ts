import { Supplier } from "src/app/supplier/model/supplier";

export interface Company {

    id?: string,
    cnpj?:string,
    nomeFantasia?:string,
    cep?:string,
    suppliers?:Supplier[]
}