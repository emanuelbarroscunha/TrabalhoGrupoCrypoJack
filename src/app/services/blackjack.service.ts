import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BlackjackService {


  constructor(private httpAsk : HttpClient) { }

  cartas = "https://deckofcardsapi.com/api/deck/ay28l6dqag4e/draw/?count=1";
  url = "https://deckofcardsapi.com/api/deck/ay28l6dqag4e/shuffle/";

  //baralhar cartas
  shuffle(){
    return this.httpAsk.get(this.url);
  }

  //pedir uma carta
  getCard(){
    return this.httpAsk.get(this.cartas);
  }



}
