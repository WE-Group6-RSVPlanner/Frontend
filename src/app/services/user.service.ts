import { Injectable } from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {PublicEvent} from "../models/PublicEvent";
import {hostUrl} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url = hostUrl + "event/";

  constructor(private http: HttpClient) { }

  saveUser(email:string){
    localStorage.setItem("user",email);
  }
  isLoggedIn(): boolean{
    return this.getUser() != null;
  }

  logOut(){
    localStorage.removeItem("user");
  }

  getUser():string | null{
    return localStorage.getItem("user");
  }

  getPrivateEventsOfUser(): Observable<any> {
    let user = this.getUser();

    if (user !== null) {
        console.log(user);

        let params = new HttpParams()
            .set('page_number', '0')
            .set('page_size', '100')
            .set('event_type', 'PRIVATE')
            .set('attendee_email', user);
        return this.http.get(this.url, { params });
    } else {
        console.error('User is null');
        return EMPTY;
    }
  }

  submitPossibleDatesFromPrivateEvent(dateArray:string[], event:PrivateEvent){
    console.log(dateArray);
    console.log(event);

    const requestBody = {
        name: event.name,
        email: event.email,
        attendee_availabilities: event.eventDates.map(eventDate => ({
            start_time: eventDate + "T00:00:00Z",
            end_time: eventDate + "T00:00:00Z",
            status: dateArray.includes(eventDate) ? "ACCEPTED" : "DECLINED"
        }))
    };

    return this.http.post(`${this.url}${event.eventID}`, requestBody);
  }

  getPublicEventsOfUser(): Observable<any> {
      let user = this.getUser();

      if (user !== null) {
          console.log(user);

          let params = new HttpParams()
              .set('page_number', '0')
              .set('page_size', '100')
              .set('event_type', 'PUBLIC')
              .set('attendee_email', user);

          return this.http.get(this.url, { params });
      } else {
          console.error('User is null');
          return EMPTY;
      }
  }

  signOutFromEvent(event : PublicEvent){
    //TODO: Add service remove user as participant from public event
    console.log(event.name);
    return 200;
  }
}
