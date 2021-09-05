import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
const BASE_URL = 'https://mean-invoice-builder.herokuapp.com/api';
@Injectable()
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>('https://mean-invoice-builder.herokuapp.com/api/clients');
  }
  createClient(body: Client): Observable<Client> {
    return this.httpClient.post<Client>('https://mean-invoice-builder.herokuapp.com/api/clients', body);
  }
  getClient(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`https://mean-invoice-builder.herokuapp.com/api/clients/${id}`);
  }
  updateClient(id: string, body: Client): Observable<Client> {
    return this.httpClient.put<Client>(`https://mean-invoice-builder.herokuapp.com/api/clients/${id}`, body);
  }
  deleteClient(id: string): Observable<Client> {
    return this.httpClient.delete<Client>(`https://mean-invoice-builder.herokuapp.com/api/clients/${id}`);
  }

}
