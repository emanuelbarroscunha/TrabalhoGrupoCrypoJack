import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { TradeComponent } from './components/trade/trade.component';

const routes: Routes = [
  {path:"trade",component:TradeComponent},
  {path:"nav",component:NavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
