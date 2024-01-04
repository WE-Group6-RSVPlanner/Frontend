import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
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
  ) {
    route.queryParams.subscribe(params => {
      console.log(params);
      let searchValue = convertToParamMap(params).get("search") || "";
      this.loadSearchData(searchValue);
    })
  }

  public events : PublicEvent[] = [];
  private dialogRef: MatDialogRef<SignupPopupComponent> | undefined;

  ngOnInit(): void {
    let searchValue = this.route.snapshot.queryParamMap.get("search") || "";
    this.loadSearchData(searchValue);
  }

  loadSearchData(params : string){
    this.searchService.searchEvents(params)
      .subscribe(data => {
        console.log(data);
        this.events = data.map((event: any) => ({
          eventID: event.event_id,
          email: event.organizer.email,
          name: event.organizer.name,
          eventTitle: event.title,
          eventDescription: event.description,
          eventDate: event.date_times[0].start_time.split("T")[0],
          eventLocation: event.location,
          locationDescription: "",
          participants: event.attendees_count
        }))
        console.log(this.events);
      }, error => {
        console.log(error.error.error)
        console.log("ERROR CODE: " + error.status)
        console.log(error)
        this.events = [];
      })
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

      this.searchService.signUpEvent(publicEventSignUp)
          .subscribe(response => {
            console.log(response);
            this.snackBar.open(signupValue.name + ", you are signed up for " + event.eventTitle, "Thanks!")
          }, error => {
            console.log(error.error.error)
            console.log("ERROR CODE: " + error.status)
            console.log(error)
            this.snackBar.open("Ooops, something went wrong!", "Close")
          })
    })
  }
}
