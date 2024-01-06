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
        eventID: "",
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
