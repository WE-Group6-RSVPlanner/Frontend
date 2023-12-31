import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PublicEventComponent} from "./public-event/public-event.component";
import {PrivateEventComponent} from "./private-event/private-event.component";
import {MyEventsComponent} from "./my-events/my-events.component";
import {PublicEventsSearchComponent} from "./public-events-search/public-events-search.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'public-events', component: PublicEventComponent},
  {path: 'private-events', component: PrivateEventComponent},
  {path: 'my-events', component: MyEventsComponent},
  {path: 'search-events', component: PublicEventsSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
