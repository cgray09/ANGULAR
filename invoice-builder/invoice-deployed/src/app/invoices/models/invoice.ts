import { Client } from '../../clients/models/client';

export class Invoice {
  _id: any; //string;
  item: any; //string;
  qty: any; //number;
  date: any; //Date;
  due: any; //Date;
  tax: any; //number;
  rate: any; //number;
  client: any; //Client;
}
export class InvoicePaginationRsp {
  docs: any; //Invoice[];
  total: any; //number;
  pages: any; //number;
  page: any; //number;
  limit: any; //number;
}
