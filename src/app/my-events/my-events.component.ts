import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {PublicEvent} from "../models/PublicEvent";
import {PrivateEvent} from "../models/PrivateEvent";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventsBackend} from "../models/backendModels/EventsBackend";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  constructor(public userService : UserService, private snackBar:MatSnackBar) { }

  public publicEvents: PublicEvent[] = [];
  public privateEvents: PrivateEvent[] = [];

  ngOnInit(): void {
    if (this.userService.isLoggedIn()){
      this.userService.getPublicEventsOfUser()
          .subscribe(data => {
            console.log(data)

            this.publicEvents = data.map((publicEvent: EventsBackend) => ({
              eventID: publicEvent.event_id,
              email: publicEvent.organizer.email,
              name: publicEvent.organizer.name,
              eventTitle: publicEvent.title,
              eventDescription: publicEvent.description,
              eventDate: publicEvent.date_times.map((date_time: any) => date_time.start_time.split('T')[0]),
              eventLocation: publicEvent.location,
              locationDescription: publicEvent.location_description,
              participants: publicEvent.attendees_count
            }))
            console.log(this.publicEvents);
          }, error => {
            console.log(error.error.error)
            console.log("ERROR CODE: " + error.status)
            console.log(error)
            this.publicEvents = [];
          })

      this.userService.getPrivateEventsOfUser()
          .subscribe(data => {
            console.log("Data")
            console.log(data)

            this.privateEvents = data.map((privateEvent: EventsBackend) => ({
              eventID: privateEvent.event_id,
              email: privateEvent.organizer.email,
              name: privateEvent.organizer.name,
              eventTitle: privateEvent.title,
              eventDescription: privateEvent.description,
              eventLocation: privateEvent.location,
              participants: privateEvent.attendees.map((invited_person: any) => invited_person.email),
              eventDates: privateEvent.date_times.map((date_time: any) => date_time.start_time.split('T')[0]),
              attendees:privateEvent.attendees
            }))
            console.log(this.privateEvents);
          }, error => {
            console.log(error.error.error)
            console.log("ERROR CODE: " + error.status)
            console.log(error)
            this.privateEvents = [];
          })
    }
  }

  signOut(event: PublicEvent) {
    this.userService.signOutFromEvent(event)
      .subscribe(response => {
        console.log(response);
        this.snackBar.open("You successfully signed out from: " + event.eventTitle, "Thanks!");
        // window.location.reload();
      }, error => {
        console.log(error.error.error)
        console.log("ERROR CODE: " + error.status)
        console.log(error)
        this.snackBar.open("Ooops, something went wrong!", "Close")
      })
  }
}
