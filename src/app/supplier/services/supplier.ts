import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, catchError } from 'rxjs';
import { Supplier } from '../model/supplier';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private urlApi = 'http://127.0.0.1:8080/api/supplier'
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {

    const response = this.http.get<Supplier[]>(this.urlApi);
    return response;

  };

  createSupplier(company: Supplier) {
    return this.http.post<Supplier>(this.urlApi, company, { headers: this.jsonHeaders });
  }


  getSupplier(id: string): Observable<Supplier> {
    if (id === '') {
      return of(this.startBankSlupplier());
    }
    const urlID = `${this.urlApi}/${id}`;
    return this.http.get<Supplier>(urlID);

  }

  updateSuppplier(company: Supplier) {
    const urlID = `${this.urlApi}/${company.id}`;
    return this.http.put<Supplier>(urlID, company,
      { headers: this.jsonHeaders }
    );


  }
  deleteSupplier(id: string) {
    const urlID = `${this.urlApi}/${id}`;
    return this.http.delete<Supplier>(urlID,
      { headers: this.jsonHeaders }
    );
  }

  private startBankSlupplier(): Supplier {
    return {
      id: undefined,
      cpfCnpj: undefined,
      name: undefined,
      email: undefined,
      cep: undefined,
      birthDate: undefined,
      rg: undefined,
      type: undefined
    }
  }

  private handleError(err: any) {
    let msgError: string;

    if (err.error instanceof ErrorEvent) {
      msgError = `An Error had ocurred ${err.error.message}`;
    } else {
      msgError = `An Error had ocurred on the backend API: ${err.staus}`;
    }

    return new Error(msgError);
  }
}
