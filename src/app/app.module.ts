import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeComponent } from './components/trade/trade.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlackJackComponent } from './components/black-jack/black-jack.component';
import { HomeComponent } from './components/home/home.component';
import { FourComponent } from './components/four/four.component';



@NgModule({
  declarations: [
    AppComponent,
    TradeComponent,
    NavComponent,
    FooterComponent,
    BlackJackComponent,
    HomeComponent,
    FourComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
