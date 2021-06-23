import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor(private http: HttpClient) { }

  link="https://api.coinbase.com/v2/prices/spot?currency=USD";

  getCoin()
  {
    return this.http.get(this.link);
  }
   

}
