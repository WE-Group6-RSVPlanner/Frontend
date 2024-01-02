import { Injectable } from '@angular/core';
import {PublicEvent} from "../models/PublicEvent";
import {PublicEventSignUp} from "../models/PublicEventSignUp";

@Injectable({
  providedIn: 'root'
})
export class EventSearchService {

  constructor() { }

  searchEvents(searchParam : string) : PublicEvent[]{
    //TODO: Send request to backend and return all events
    console.log(searchParam);
    const testEvent : PublicEvent = {
      email: "test@gmail.com",
      eventDate: "01.05.2024 19:30",
      eventDescription: "",
      eventLocation: "Castleroad 4, 12749-New Hill",
      eventTitle: "Super Cool Wedding",
      locationDescription: "Big castle on the hill, creepy looking butler awaits you!",
      name: "John Smith"
    }
    return [testEvent];
  }

  signUpEvent(publicEventSignUp : PublicEventSignUp){
    console.log("Signed Up: " + publicEventSignUp.name);
    return 200;
  }
}
