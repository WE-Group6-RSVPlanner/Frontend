import { Injectable } from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {PublicEvent} from "../models/PublicEvent";
import {hostUrl} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenerateEventService {
  private url = hostUrl + "event/";

  constructor(private http: HttpClient) { }

  createPrivateEvent(eventData: PrivateEvent): Observable<any> {
    console.log("creating private event ...");

    const requestBody = {
      title: eventData.eventTitle,
      description: eventData.eventDescription,
      possible_date_times: eventData.eventDates.map(eventDate => ({
        start_time: eventDate + "T00:00:00Z",
        end_time: eventDate + "T00:00:00Z"
      })),
      location: "", // TODO?
      event_type: "PRIVATE",
        // TODO: invited people are currently not accepted by backend
        //participants: eventData.participants,
      organizer: {
        name: eventData.name,
        email: eventData.email
      }
    };

    return this.http.post(this.url, requestBody);
  }

  createPublicEvent(eventData: PublicEvent): Observable<any> {
    console.log("creating public event ...");

    const requestBody = {
      title: eventData.eventTitle,
      description: eventData.eventDescription,
      possible_date_times: [{
        start_time: eventData.eventDate + "T00:00:00Z",
        end_time: eventData.eventDate + "T00:00:00Z"
      }],
      location: eventData.eventLocation,
      location_description: eventData.locationDescription,
      event_type: "PUBLIC",
      organizer: {
        name: eventData.name,
        email: eventData.email
      }
    }

    return this.http.post(this.url, requestBody);
  }
}
