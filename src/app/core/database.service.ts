import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ModalService} from '../shared/modal/modal.service';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient,
              private modalService: ModalService) { }

  getData(path): Observable<any> {
    return this.httpClient.get(`${this.databaseURL}/${path}/`);
  }

  deleteData(collection: string, id: string): Observable<any> {
    return this.httpClient.delete(`${this.databaseURL}/${collection}/${id}`);
  }

  postData(collection: string, item: {}): void {
    this.httpClient
      .post<any>(
        this.databaseURL + `/${collection}/`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.httpErrorHandler)
      )
      .subscribe();
  }

  getItemData(collection: string, id: string): Observable<any> {
    return this.httpClient.get(`${this.databaseURL}/${collection}/${id}`);
  }

  httpErrorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.modalService.onOpenDialog(`Something went wrong: ${errorMessage}`);
    return throwError(errorMessage);
  }
}
