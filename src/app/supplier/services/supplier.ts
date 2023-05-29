import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private urlApi = 'http://127.0.0.1:8080/api/task'
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  obterTarefas(): Observable<Tarefa[]> {
    const response = this.http.get<Tarefa[]>(this.urlApi);
    return response;
  }

  criarTarefa(tarefa: Tarefa) {

    return this.http.post<Tarefa>(this.urlApi, tarefa, { headers: this.jsonHeaders });
  }


  obterTarefa(id: string): Observable<Tarefa> {
    if (id === '') {
      return of(this.inicializarTarefa());
    }
    const urlID = `${this.urlApi}/${id}`;
    return this.http.get<Tarefa>(urlID);

  }

  atualizarTarefa(tarefa: Tarefa) {
    const urlID = `${this.urlApi}/${tarefa.id}`;
    return this.http.put<Tarefa>(urlID, tarefa,
      { headers: this.jsonHeaders }
    );


  }
  excluirTarefa(id: string) {
    const urlID = `${this.urlApi}/${id}`;
    return this.http.delete<Tarefa>(urlID,
      { headers: this.jsonHeaders }
    );
  }

  private inicializarTarefa(): Tarefa {
    return {
      id: undefined,
      nome: undefined,
      detalhes: undefined,
      concluido: undefined
    }
  }

  private tratarErro(err: any) {
    let msgError: string;

    if (err.error instanceof ErrorEvent) {
      msgError = `Ocorreu um erro: ${err.error.message}`;
    } else {
      msgError = `Ocorreu um error na api: ${err.staus}`;
    }

    return new Error(msgError);
  }
}
