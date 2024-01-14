import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {hostUrl} from "../../environments/environment";
import {Observable} from "rxjs";
import {PublicEvent} from "../models/PublicEvent";

@Injectable({
  providedIn: 'root'
})
export class GetEventImageService {
  private url = hostUrl + "event/";

  constructor(private http: HttpClient) { }

  getEventImage(event : PublicEvent): Observable<Blob> {
    return this.http.get(`${this.url}${event.eventID}/image`, { responseType: 'blob' });
  }
}
