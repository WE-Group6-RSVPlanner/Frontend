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

  constructor(private http: HttpClient) { }

  searchEvents(searchParam: string): Observable<any> {
    console.log(searchParam);

    let params = new HttpParams()
        .set('page_number', '0')
        .set('page_size', '100')
        .set('event_type', 'PUBLIC')
        .set('title', searchParam);

    return this.http.get(`${hostUrl}event/`, { params });
  }

  signUpEvent(publicEventSignUp : PublicEventSignUp){
    console.log("Signed Up: " + publicEventSignUp.name);
    return 200;
  }
}
