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
    this.getPlayer();
    this.getDinheiro();
  }

  cartinhas : Array<string> = [];

  carta : any;

  bet : number = 0;
  nomePlayer : string;
  playerPoints : number = 0;

  dealerPoints : number = 0;



  dinheiro : number = 0;
  inGame : number = 0;
  turno : number = 0;
  gameStop : number = 0;
  asPlayer : number = 0;
  asDealer : number = 0;

  cartaRecebida : any;
  cartaMao : any;
  cartaDesenho : string;
  posicao : number;
  value : number;

  arrayValueCard : Array<string> = ["ACE","7","KING","JACK","QUEEN","10","9","8","6","5","4","3","2"];

  arrayValue : Array<number> = [11, 7, 10, 10, 10, 10, 9, 8, 6, 5, 4, 3, 2];

  arrayMaoJogador : Array<string>;

  setdinheiro(){
    this.localStorage.set("money",this.dinheiro);
  }
  getDinheiro(){
    this.dinheiro =Number( this.localStorage.getname("money"));
  }

  //baralha cartas
  shuffle(){
    this.blackJackS.shuffle().subscribe();
  }

  getCard(){
    this.blackJackS.getCard().subscribe(data => {console.log(data['cards'])});
    console.log(this.cartinhas['code']);
  }

  //get player
  getPlayer(){

  }

  //bet
  beting(val){
    if(this.inGame == 0){
      if(val <= this.dinheiro){
        this.dinheiro -= val;
        this.bet += val;
        this.setdinheiro();
      }
      else{
        alert('Não tem dinheiro suficiente!');
      }
    }
  }

  //start game
  startGame(){
    this.blackJackS.shuffle().subscribe((x =>{
      if (x['success'] == true) {
        console.log('baralha');
        this.inGame = 0;
      }
      else{
        console.log('erro');
      }
    }));

    if(this.bet >= 1){
      this.playerPoints = 0;
      this.dealerPoints = 0;

      this.inGame = 1;

      this.pedir(); //pede para o jogador
    }
    else{
      alert('É preciso apostar!');
    }
  }

  //pedir carta jogador
  pedir(){
    if(this.dealerPoints >= 21 || this.playerPoints >= 21){
      this.calcularVitoria();
      this.inGame = 0;
    }
    else{
      this.blackJackS.getCard().subscribe((x) => {
        if (x['success'] == true) {
          //this.carta = x['cards'];
          this.cartaRecebida = x;
          this.cartaMao = this.cartaRecebida.cards[0].value;
          this.cartaDesenho = this.cartaRecebida.cards[0].image;

          this.cartinhas.push(x['cards'][0].image);

          for (let i = 0; i < this.arrayValueCard.length; i++) {
            if(this.arrayValueCard[i] == this.cartaMao){
              this.posicao = i;
            }
          }

          if(this.cartaMao == 'ACE'){
            this.asPlayer += 1; //o player tem um as na mao
          }

          this.playerPoints += this.arrayValue[this.posicao]; //valor da mao

          /*
          if(this.playerPoints > 21 || this.asPlayer == 1){
            this.playerPoints -= 10;
          }
          */

          //muda turno
          this.turno = 1;
          this.playGame();
        } else {
          alert("error sem carta");
        }
      });
    }
  }

  ficar(){
    console.log('ficar');
    this.gameStop = 1;
    this.pedirDealer();
  }

  pedirDealer(){
    if(this.gameStop == 1){ //pede mais uma carta ao dealer e depois calcula vitoria
      if(this.dealerPoints <= 21){ //se o bot tiver carta <= 16 pede outra
        this.blackJackS.getCard().subscribe((x) => {
          if (x['success'] == true) {
            this.carta = x['cards'];
            this.cartaRecebida = x;
            this.cartaMao = this.cartaRecebida.cards[0].value;
            //console.log(this.cartaMao);

            for (let i = 0; i < this.arrayValueCard.length; i++) {
              if(this.arrayValueCard[i] == this.cartaMao){
                this.posicao = i;
              }
            }
            console.log(this.cartaMao);

            this.dealerPoints += this.arrayValue[this.posicao]; //valor da mao

            //muda turno
            this.turno = 0;

            this.calcularVitoria();
          } else {
            alert("error sem carta");
          }
        });
      }
    }
    else if(this.dealerPoints >= 21 || this.playerPoints >= 21){
      this.calcularVitoria();
      this.inGame = 0;
      console.log('dealer + 21');
    }
    else{
      if(this.dealerPoints <= 21){ //se o bot tiver carta <= 16 pede outra
        this.blackJackS.getCard().subscribe((x) => {
          if (x['success'] == true) {
            this.carta = x['cards'];
            this.cartaRecebida = x;
            this.cartaMao = this.cartaRecebida.cards[0].value;
            //console.log(this.cartaMao);

            for (let i = 0; i < this.arrayValueCard.length; i++) {
              if(this.arrayValueCard[i] == this.cartaMao){
                this.posicao = i;
              }
            }
            console.log(this.cartaMao);

            this.dealerPoints += this.arrayValue[this.posicao]; //valor da mao

            //muda turno
            this.turno = 0;
          } else {
            alert("error sem carta");
          }
        });
      }
    }
  }

  playGame(){
    if(this.turno == 1){
      this.pedirDealer();
    }
  }

  calcularVitoria(){
    if(this.playerPoints > this.dealerPoints && this.playerPoints <= 21){
      //o que apostamos reavemos a dobrar
      this.dinheiro += this.bet * 2;
      this.setdinheiro();
      alert('Ganhou!');
      console.log('win');
      this.inGame = 0;
      this.gameStop = 0;
    }
    else if(this.playerPoints > this.dealerPoints && this.playerPoints > 21){
      //o que apostamos reavemos a dobrar
      alert('Perdeu!');
      this.dinheiro -= this.bet;
      console.log('Lose');
      this.inGame = 0;
      this.gameStop = 0;
      this.setdinheiro();
    }
    else if(this.dealerPoints > this.playerPoints && this.dealerPoints <= 21){
      alert('Perdeu! 1');
      this.dinheiro -= this.bet;
      console.log('lose');
      this.inGame = 0;
      this.gameStop = 0;
      this.setdinheiro();
    }
    else if(this.dealerPoints > this.playerPoints && this.dealerPoints > 21){
      //o que apostamos reavemos a dobrar
      this.dinheiro += this.bet * 2;
      alert('Ganhou!');
      console.log('Win');
      this.inGame = 0;
      this.gameStop = 0;
      this.setdinheiro();
    }
    else{ //caso empate
      //o que apostamos reavemos a o dinheiro
      this.dinheiro += this.bet;
      //alert('draw');
      this.inGame = 0;
      this.setdinheiro();
    }



    setTimeout(()=>{
      this.playerPoints = 0;
      this.dealerPoints = 0;
      this.cartinhas = [];
      this.bet = 0;
    }, 4000);
  }
}
