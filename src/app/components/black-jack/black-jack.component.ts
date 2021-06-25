import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-black-jack',
  templateUrl: './black-jack.component.html',
  styleUrls: ['./black-jack.component.css']
})
export class BlackJackComponent implements OnInit {

  constructor(private blackJackS : BlackjackService, private http: HttpClient ,private localStorage:LocalStorageService) { }

  ngOnInit(): void {

    this.getCash();
  }

  nomePlayer : string = "John Doe";
  playerPoints : number = 0;
  pintasDasCartas : Array<string> = ["ACE","7","KING","JACK","QUEEN","10","9","8","6","5","4","3","2"];
  money : number = 0;
  dentroDoJogo : number = 0;
  turn : number = 0;
  dealerPoints : number = 0;

  setCash(){
    this.localStorage.set("money",this.money);
  }
  getCash(){
    this.money =Number( this.localStorage.getname("money"));
  }


  getCard(){
    this.blackJackS.getCard().subscribe(data => {console.log(data['cards'])});
    console.log(this.deck['code']);
  }

  value : number;
  aposta : number = 0;
  stopThegame : number = 0;
  thisPlayer : number = 0;
  thisDealer : number = 0;
  carta : any;
  deck : Array<string> = [];
  cardgotten : any;
  cartaImagem : string;
  posicao : number;
  cardInHand : any;
  valorCartas : Array<number> = [11, 7, 10, 10, 10, 10, 9, 8, 6, 5, 4, 3, 2];

  shuffledeck(){
    this.blackJackS.shuffle().subscribe((x =>{
      if (x['success'] == true) {

        this.dentroDoJogo = 0;
      }
      else{
        console.log('error');
      }
    }));

    if(this.aposta >= 1){
      this.playerPoints = 0;
      this.dealerPoints = 0;

      this.dentroDoJogo = 1;

      this.askcardPlayer();
    }
    else{
      alert('Não tem aposta validada');
    }
  }

  shuffle(){
    this.blackJackS.shuffle().subscribe();
  }

  playGame(){
    if(this.turn == 1){

      this.pedirDealer();
    }
  }


  askcardPlayer(){
    if(this.dealerPoints >= 21 || this.playerPoints >= 21){
      this.victory();
      this.dentroDoJogo = 0;
    }
    else{
      this.blackJackS.getCard().subscribe((x) => {
        if (x['success'] == true) {

          this.cardgotten = x;
          this.cardInHand = this.cardgotten.cards[0].value;
          this.cartaImagem = this.cardgotten.cards[0].image;

          this.deck.push(x['cards'][0].image);

          for (let i = 0; i < this.pintasDasCartas.length; i++) {
            if(this.pintasDasCartas[i] == this.cardInHand){
              this.posicao = i;
            }
          }

          if(this.cardInHand == 'ACE'){
            this.thisPlayer += 1;
          }

          this.playerPoints += this.valorCartas[this.posicao];




          this.turn = 1;
          this.playGame();
        } else {
          alert("error: sem carta");
        }
      });
    }
  }

  apostar(val){
    if(this.dentroDoJogo == 0){
      if(val <= this.money){

        this.aposta += val;
        this.money -= val;

        this.setCash();
      }
      else{
        alert('Dinheiro da conta insufeciente');
      }
    }
  }

  stay(){

    this.stopThegame = 1;
    this.pedirDealer();
  }


  victory(){
    if(this.playerPoints > this.dealerPoints && this.playerPoints <= 21){

      this.money += this.aposta * 2;
      this.setCash();
      alert('Ganhou um total de :'+this.aposta * 2);

      this.dentroDoJogo = 0;
      this.stopThegame = 0;
    }
    else if(this.playerPoints > this.dealerPoints && this.playerPoints > 21){
      this.money -= this.aposta;
      alert('Perdeu um total de:'+this.aposta);
      this.dentroDoJogo = 0;
      this.stopThegame = 0;
      this.setCash();
    }
    else if(this.dealerPoints > this.playerPoints && this.dealerPoints <= 21){

      this.money -= this.aposta;
      alert('Perdeu um total de:'+this.aposta);
      this.dentroDoJogo = 0;
      this.stopThegame = 0;
      this.setCash();
    }
    else if(this.dealerPoints > this.playerPoints && this.dealerPoints > 21){

      this.money += this.aposta * 2;
      alert('Ganhou um total de:'+this.aposta * 2);
      this.dentroDoJogo = 0;
      this.stopThegame = 0;
      this.setCash();
    }
    else{

      this.money += this.aposta;
      alert('Ganhou um total de'+this.aposta);
      this.dentroDoJogo = 0;
      this.setCash();
    }

    setTimeout(()=>{
      this.playerPoints = 0;
      this.dealerPoints = 0;
      this.deck = [];
      this.aposta = 0;
    }, 2000);
  }


  pedirDealer(){
    if(this.stopThegame == 1){
      if(this.dealerPoints <= 21){
        this.blackJackS.getCard().subscribe((x) => {
          if (x['success'] == true) {
            this.carta = x['cards'];
            this.cardgotten = x;
            this.cardInHand = this.cardgotten.cards[0].value;


            for (let i = 0; i < this.pintasDasCartas.length; i++) {
              if(this.pintasDasCartas[i] == this.cardInHand){
                this.posicao = i;
              }
            }
            console.log(this.cardInHand);

            this.dealerPoints += this.valorCartas[this.posicao];

            this.turn = 0;

            this.victory();
          } else {
            alert("nao tem carta");
          }
        });
      }
    }
    else if(this.dealerPoints >= 21 || this.playerPoints >= 21){
      this.victory();
      this.dentroDoJogo = 0;

    }
    else{
      if(this.dealerPoints <= 21){
        this.blackJackS.getCard().subscribe((x) => {
          if (x['success'] == true) {
            this.carta = x['cards'];
            this.cardgotten = x;
            this.cardInHand = this.cardgotten.cards[0].value;

            for (let i = 0; i < this.pintasDasCartas.length; i++) {
              if(this.pintasDasCartas[i] == this.cardInHand){
                this.posicao = i;
              }
            }


            this.dealerPoints += this.valorCartas[this.posicao];


            this.turn = 0;
          } else {
            alert("nao tem carta selecionada");
          }
        });
      }
    }
  }

}
