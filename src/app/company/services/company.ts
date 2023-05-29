import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, catchError } from 'rxjs';
import { Company } from '../model/company';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private urlApi = 'http://127.0.0.1:8080/api/company'
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  
  getCompanies(): Observable<Company[]> {

    const response = this.http.get<Company[]>(this.urlApi);
    return response;

  };


  createCompany(company: Company) {
    return this.http.post<Company>(this.urlApi, company, { headers: this.jsonHeaders });
  }


  getCompany(id: string): Observable<Company> {
    if (id === '') {
      return of(this.startBlankCompany());
    }
    const urlID = `${this.urlApi}/${id}`;
    return this.http.get<Company>(urlID);

  }

  updateCompany(company: Company) {
    const urlID = `${this.urlApi}/${company.id}`;
    return this.http.put<Company>(urlID, company,
      { headers: this.jsonHeaders }
    );


  }
  deleteCompany(id: string) {
    const urlID = `${this.urlApi}/${id}`;
    return this.http.delete<Company>(urlID,
      { headers: this.jsonHeaders }
    );
  }

  private startBlankCompany(): Company {
    return {
      id: undefined,
      cnpj: undefined,
      nomeFantasia: undefined,
      cep: undefined,
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
