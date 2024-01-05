import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreatePublicEventComponent} from "./public-event/create-public-event.component";
import {CreatePrivateEventComponent} from "./private-event/create-private-event.component";
import {MyEventsComponent} from "./my-events/my-events.component";
import {PublicEventsSearchComponent} from "./public-events-search/public-events-search.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'public-events', component: CreatePublicEventComponent},
  {path: 'private-events', component: CreatePrivateEventComponent},
  {path: 'my-events', component: MyEventsComponent},
  {path: 'search-events', component: PublicEventsSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
