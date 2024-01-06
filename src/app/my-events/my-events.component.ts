import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {PublicEvent} from "../models/PublicEvent";
import {PrivateEvent} from "../models/PrivateEvent";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  constructor(public userService : UserService, private snackBar:MatSnackBar) { }

  public publicEvents: PublicEvent[] = [];
  public privateEvents: PrivateEvent[] = [];
  public activateSignOut : boolean = false;

  ngOnInit(): void {
    if (this.userService.isLoggedIn()){
      this.publicEvents = this.userService.getPublicEventsOfUser();

      this.userService.getPrivateEventsOfUser()
          .subscribe(data => {
            console.log(data)

            this.privateEvents = data.map((privateEvent: any) => ({
              eventID: privateEvent.event_id,
              email: privateEvent.organizer.email,
              name: privateEvent.organizer.name,
              eventTitle: privateEvent.title,
              eventDescription: privateEvent.description,
              participants: [], // TODO: backend only returns the ones which have clicked "attend" but not invited people
              eventDates: privateEvent.date_times.map((date_time: any) => date_time.start_time.split('T')[0].replace('-', ' '))
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
    this.userService.signOutFromEvent(event);
    this.snackBar.open("Successfully signed our from event!", "Close");
    window.location.reload();
  }
}
