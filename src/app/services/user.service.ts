import { Injectable } from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {PublicEvent} from "../models/PublicEvent";
import {hostUrl} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, EMPTY, map} from "rxjs";
import {Attendee, EventsBackend} from "../models/backendModels/EventsBackend";
import {AttendeeAvailability} from "../models/backendModels/AttendeeAvailability";

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

  notificationEnabled():boolean{
    return false;
  }

  setNotifications(newStatus:boolean){

  }

  getPrivateEventsOfUser(): Observable<any> {
    const user = this.getUser();

    if (user !== null) {
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
    const user = this.getUser();

    if (user !== null) {
      let encodedUser = encodeURIComponent(user);

      const requestBody = event.eventDates.map(eventDate => ({
          start_time: eventDate + "T00:00:00Z",
          end_time: eventDate + "T00:00:00Z",
          status: dateArray.includes(eventDate) ? "ACCEPTED" : "DECLINED"
        }));

      return this.http.put(`${this.url}${event.eventID}/${encodedUser}`, requestBody);
    } else {
      console.error('User is null');
      return EMPTY;
    }
  }

  getPublicEventsOfUser(): Observable<any> {
      const user = this.getUser();

      if (user !== null) {
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
    const user = this.getUser();

    if (user !== null) {
      let encodedUser = encodeURIComponent(user);
      console.log(event.eventID)
      console.log(encodedUser)

      return this.http.delete(`${this.url}${event.eventID}/${encodedUser}`);
    } else {
      console.error('User is null');
      return EMPTY;
    }
  }

  getAttendeeDetails(event : PrivateEvent) {
    const user = this.getUser();

    return this.http.get<EventsBackend>(`${this.url}${event.eventID}`).pipe(
      map(event => {
        const attendee = event.attendees.find((a: Attendee) => a.email === user);
        return attendee ? attendee.attendee_availabilities.map((av: AttendeeAvailability) => ({
          start_time: av.start_time.split("T")[0],
          end_time: av.start_time.split("T")[0],
          status: av.status
        })) : [];
      })
    )
  }
}
