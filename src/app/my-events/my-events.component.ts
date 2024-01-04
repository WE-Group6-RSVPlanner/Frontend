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

  ngOnInit(): void {
    if (this.userService.isLoggedIn()){
      this.publicEvents = this.userService.getPublicEventsOfUser();
      this.privateEvents = this.userService.getPrivateEventsOfUser();
    }
  }

  signOut(event: PublicEvent) {
    this.userService.signOutFromEvent(event);
    this.snackBar.open("Successfully signed our from event!", "Close");
    window.location.reload();
  }
}
