import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice, InvoicePaginationRsp } from '../models/invoice';
import { environment } from '../../../environments/environment.prod';

const BASE_URL = 'https://mean-invoice-builder.herokuapp.com/api';
@Injectable()
export class InvoiceService {
  constructor(private httpClient: HttpClient) { }

  getInvoices({ page, perPage, sortField, sortDir, filter }: any): Observable<InvoicePaginationRsp> {
    let queryString = `https://mean-invoice-builder.herokuapp.com/api/invoices?page=${page + 1}&perPage=${perPage}`;
    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if (filter) {
      queryString = `${queryString}&filter=${filter}`
    }
    return this.httpClient.get<InvoicePaginationRsp>(queryString);
  }
  createInvoice(body: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>('https://mean-invoice-builder.herokuapp.com/api/invoices', body);
  }
  deleteInvoice(id: string): Observable<Invoice> {
    return this.httpClient.delete<Invoice>(`https://mean-invoice-builder.herokuapp.com/api/invoices/${id}`)
  }
  //getInvoice(id: string): Observable<Invoice> {
  getInvoice(id: string): any {
    return this.httpClient.get<Invoice>(`https://mean-invoice-builder.herokuapp.com/api/invoices/${id}`)
  }
  updateInvoice(id: string, body: Invoice) {
    return this.httpClient.put<Invoice>(`https://mean-invoice-builder.herokuapp.com/api/invoices/${id}`, body);
  }
  downloadInvoice(id: string){
    return this.httpClient.get(`https://mean-invoice-builder.herokuapp.com/api/invoices/${id}/download`,{
      responseType: 'blob' //response type is used to read binary data
    })
  }
}
