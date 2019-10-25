import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ModalService} from '../shared/modal/modal.service';

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

  deleteData(collection: string, id: string) {
    return this.httpClient.delete(`${this.databaseURL}/${collection}/${id}`);
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
