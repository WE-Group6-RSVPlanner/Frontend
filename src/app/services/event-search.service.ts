import { Injectable } from '@angular/core';
import {PublicEvent} from "../models/PublicEvent";

@Injectable({
  providedIn: 'root'
})
export class EventSearchService {

  constructor() { }

  searchEvents(searchParam : string) : PublicEvent[]{
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
}
