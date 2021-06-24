import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackJackComponent } from './components/black-jack/black-jack.component';
import { FourComponent } from './components/four/four.component';
import { HomeComponent } from './components/home/home.component';

import { NavComponent } from './components/nav/nav.component';
import { TradeComponent } from './components/trade/trade.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fourofour', component: FourComponent },
  {path:"trade",component:TradeComponent},
  {path:"nav",component:NavComponent},
  {path:"blackjack",component:BlackJackComponent},
  { path: '**', redirectTo: 'fourofour' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
