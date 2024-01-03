import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { NavigationDialogComponent } from './navigation-dialog/navigation-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateEventComponent } from './private-event/private-event.component';
import { PublicEventComponent } from './public-event/public-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import { EventPopupComponent } from './event-popup/event-popup.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ImagePopupComponent} from "./image-popup/image-popup.component";
import { PublicEventsSearchComponent } from './public-events-search/public-events-search.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { SearchBarComponent } from './search-bar/search-bar.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    NavigationDialogComponent,
    DashboardComponent,
    PrivateEventComponent,
    PublicEventComponent,
    MyEventsComponent,
    EventPopupComponent,
    ImagePopupComponent,
    PublicEventsSearchComponent,
    SignupPopupComponent,
    SearchBarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatToolbarModule,
        FormsModule,
        MatTooltipModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
