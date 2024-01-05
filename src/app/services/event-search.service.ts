import { Injectable } from '@angular/core';
import {PublicEvent} from "../models/PublicEvent";
import {PublicEventSignUp} from "../models/PublicEventSignUp";
import {HttpClient, HttpParams} from "@angular/common/http";
import {hostUrl} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventSearchService {
  private url = hostUrl + "event/";

  constructor(private http: HttpClient) { }

  searchEvents(searchParam: string): Observable<any> {
    console.log(searchParam);

    let params = new HttpParams()
        .set('page_number', '0')
        .set('page_size', '100')
        .set('event_type', 'PUBLIC')
        .set('title', searchParam);

    return this.http.get(this.url, { params });
  }

  signUpEvent(publicEventSignUp : PublicEventSignUp){
    console.log("adding attendee ...")

    const requestBody = {
      name: publicEventSignUp.name,
      email: publicEventSignUp.email,
      attendee_availabilities: [
        {
          start_time: publicEventSignUp.publicEvent.eventDate + "T00:00:00Z",
          end_time: publicEventSignUp.publicEvent.eventDate + "T00:00:00Z",
          status: "ACCEPTED"
        }
      ]
    };

    return this.http.post(`${this.url}${publicEventSignUp.publicEvent.eventID}`, requestBody);
  }
}
