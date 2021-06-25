import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { GeralService } from 'src/app/services/geral.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(private sgeral:GeralService,private localStorage:LocalStorageService) { }

  bitValue:any="valor bit";
  valueInBit:any=0;
  valueInBitAdd:any=0;

  money:any=0;
  moneyInvested:any=0;
  converterCash:any;
  storethisdata:any="nada";
  profit:any=0;
  valor:any=0;
  oldbitvalue:any=0;

  ngOnInit(): void {

    let name5:any = document.getElementById('separacao2');
    name5.style.display = 'none';

    setInterval(()=> { this.getCoin2() },500);
    this.getCoin2();
/*
    this.localStorage.set("teste","yaydasdasa");
    this.storethisdata=this.localStorage.getname("teste");
    console.log( this.storethisdata);
*/

     this.setMoney();

  }


  getCoin2()
  {
    this.sgeral.getCoin().subscribe((x:any) => {

        console.log(x['data'].amount);
        this.bitValue=x['data'].amount;

    });
  }


  resetMoney()
  {
    if(!this.localStorage.getname("money")){

    this.localStorage.set("money",10000);
    this.localStorage.set("moneyInvested",0);
    this.localStorage.set("valueInBit",0);
    this.setMoney();

  }
  let name5:any = document.getElementById('separacao2');
  name5.style.display = 'flex';
  }

  setMoney()
  {
    this.money = this.localStorage.getname("money");
    this.moneyInvested = this.localStorage.getname("moneyInvested");
    this.valueInBit =  this.localStorage.getname("valueInBit");
  }

  buy1000(variavel : any)
  {
    if((Number(this.money)-variavel)>=0)
    {
      this.valueInBitAdd = Number(variavel) / Number(this.bitValue);
      this.localStorage.set("money",Number(this.money)-Number(variavel));
      this.localStorage.set("moneyInvested",Number(this.moneyInvested)+Number(variavel));
      this.localStorage.set("valueInBit",Number(this.valueInBit)+Number(this.valueInBitAdd) );

      this.setMoney();
    }
    else
    {
      window.alert("NOT ENOUGH MONEY!")
    }
  }

  sell()
  {
    this.converterCash =  this.valueInBit * this.bitValue;

    this.profit=this.converterCash-this.moneyInvested;
    console.log(this.profit);
    this.localStorage.set("moneyInvested",0);
    this.localStorage.set("valueInBit",0);
    this.localStorage.set("money",Number(this.money)+ Number(this.converterCash));

    this.setMoney();
  }
}
