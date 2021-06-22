// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

    // constructor(private http: Http) { }
    constructor(private http: HttpClient) { }

    // public pagesBS = new BehaviorSubject<string>(null);
    public pagesBS = new BehaviorSubject<Object>(null); // i believe he said this is
                                                        // an observable and its like
                                                        // global state since it keeps
                                                        // track of the data and the 
                                                        // changes in the data from all  
                                                        // the components

    getPages() {
        // return this.http.get('http://localhost:3000/pages')
        //     .map(res => res.json());
        return this.http.get('http://localhost:3000/pages');
    }

    getPage(slug) {
        // return this.http.get('http://localhost:3000/pages/' + slug)
        //     .map(res => res.json());
        return this.http.get('http://localhost:3000/pages/' + slug);
    }

    postAddPage(value) {
        // return this.http.post('http://localhost:3000/pages/add-page', value)
        //     .map(res => res.json());
        return this.http.post('http://localhost:3000/pages/add-page', value);
    }

    getEditPage(id) {
        // return this.http.get('http://localhost:3000/pages/edit-page/' + id)
        //     .map(res => res.json());
        return this.http.get('http://localhost:3000/pages/edit-page/' + id);
    }

    postEditPage(value) {
        // return this.http.post('http://localhost:3000/pages/edit-page/'+value.id, value)
        //     .map(res => res.json());
        return this.http.post('http://localhost:3000/pages/edit-page/'+value.id, value);
    }

    deletePage(id) {
        // return this.http.get('http://localhost:3000/pages/delete-page/' + id)
        //     .map(res => res.json());
        return this.http.get('http://localhost:3000/pages/delete-page/' + id);
    }

}
