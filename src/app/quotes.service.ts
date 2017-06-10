import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Quote } from './quotes/quote';

@Injectable()
export class QuotesService {

  constructor(private http: Http) { }

  // Get all quotes from the API
  getAllQuotes() {
    return this.http.get('/api/quotes', this.jwt())
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  addQuote(quote: Quote) {
    return this.http.post('/api/addQuote', quote, this.jwt())
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }

  private jwt() {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Accept': 'application/json' });
    if (currentUser && currentUser.token) {
      headers.append('Authorization', `Bearer ${currentUser.token}`);
    }
    return new RequestOptions({ headers: headers });
  }
}
