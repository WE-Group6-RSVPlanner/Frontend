import { Component, OnInit, Input } from '@angular/core';
import {PublicEvent} from "../models/PublicEvent";

@Component({
  selector: 'app-public-event-container',
  templateUrl: './public-event-container.component.html',
  styleUrls: ['./public-event-container.component.scss'],
})
export class PublicEventContainerComponent implements OnInit {

  @Input()
  event!:PublicEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
