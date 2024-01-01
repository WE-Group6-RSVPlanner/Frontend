import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventSearchService} from "../services/event-search.service";
import {PublicEvent} from "../models/PublicEvent";
import {filter} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SignupPopupComponent} from "../signup-popup/signup-popup.component";
import {PublicEventSignUp} from "../models/PublicEventSignUp";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-public-events-search',
  templateUrl: './public-events-search.component.html',
  styleUrls: ['./public-events-search.component.scss']
})
export class PublicEventsSearchComponent implements OnInit {

  constructor(private route : ActivatedRoute,
              private searchService : EventSearchService,
              private dialog:MatDialog,
              private snackBar:MatSnackBar
  ) { }

  private searchValue = "";
  public events : PublicEvent[] = [];
  private dialogRef: MatDialogRef<SignupPopupComponent> | undefined;

  ngOnInit(): void {
    this.searchValue = this.route.snapshot.queryParamMap.get("search") || "";
    this.events = this.searchService.searchEvents(this.searchValue);
  }

  signUp(event:PublicEvent){
    this.dialogRef = this.dialog.open(SignupPopupComponent,{
      panelClass: 'input-dialog'
    })

    this.dialogRef.afterClosed().pipe(
      filter(signupValue => signupValue)
    ).subscribe(signupValue => {
      const publicEventSignUp : PublicEventSignUp = {
        email: signupValue.email,
        name: signupValue.name,
        publicEvent: event

      }
      this.searchService.signUpEvent(publicEventSignUp);
      //TODO: Message based on success of service
      this.snackBar.open(signupValue.name + ", you are signed up for " + event.eventTitle, "Thanks!")
    })
  }
}
