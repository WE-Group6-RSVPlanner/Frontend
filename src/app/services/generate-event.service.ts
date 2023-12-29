import { Injectable } from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {PublicEvent} from "../models/PublicEvent";

@Injectable({
  providedIn: 'root'
})
export class GenerateEventService {

  constructor() { }

  createPrivateEvent(eventData : PrivateEvent){
    console.log("private event created");
    return 200;
  }

  createPublicEvent(eventData : PublicEvent){
    console.log("public event created");
    return 200;
  }
}
