import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private urlApi = 'http://127.0.0.1:8080/api/supplier'
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  

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
