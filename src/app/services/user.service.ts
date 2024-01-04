import { Injectable } from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {PublicEvent} from "../models/PublicEvent";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveUser(email:string){
    localStorage.setItem("user",email);
  }
  isLoggedIn(): boolean{
    return this.getUser() != null;
  }

  getUser():string | null{
    return localStorage.getItem("user");
  }

  getPrivateEventsOfUser():PrivateEvent[]{
    //TODO: Add service to fetch private events from user by email
    let user = this.getUser();
    console.log(user);
    let testPrivateEvent : PrivateEvent =
      {
        email: "",
        eventDates: ["01.01", "10.11", "12.12", "13.11", "14.11", "15.11", "17.11", "18.11", "20.11"],
        eventDescription: "test",
        eventTitle: "Private Event",
        name: "Stefan",
        participants: ["Stefan", "Lisa", "Eren", "Franz","Fritz", "Fritz", "Fritz", "Fritz", "Fritz", "Fritz", "Fritz", "Fritz"]
      }

      return [testPrivateEvent];
  }

  submitPossibleDatesFromPrivateEvent(dateArray:string[], event:PrivateEvent){
    //TODO: Add service to submit possible dates for user and private event
    console.log(dateArray);
    console.log(event.name);
  }

  getPublicEventsOfUser():PublicEvent[]{
    //TODO: Add service to fetch public events from user by email
    let user = this.getUser();
    console.log(user);
    let testPublicEvent : PublicEvent =
      {
        email: "stefan@stefan.at",
        eventDate: "10.12.2024",
        eventDescription: "Jetzt gehts los es ist Party angesagt!",
        eventLocation: "Home",
        eventTitle: "Public Event",
        locationDescription: "",
        name: "Franz",
        participants: 281
      }

      return [testPublicEvent];
  }

  signOutFromEvent(event : PublicEvent){
    //TODO: Add service remove user as participant from public event
    console.log(event.name);
    return 200;
  }
}
