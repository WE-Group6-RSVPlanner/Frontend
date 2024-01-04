import {Component, Input, OnInit} from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-private-event-container',
  templateUrl: './private-event-container.component.html',
  styleUrls: ['./private-event-container.component.scss']
})
export class PrivateEventContainerComponent implements OnInit {

  @Input()
  event!:PrivateEvent;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  selectDate(buttonId : string) {
    let buttonElement = document.getElementById(buttonId)!;
    if(buttonElement.classList.contains("clicked")){
      buttonElement.classList.remove("clicked");
    }else {
      buttonElement.classList.add("clicked");
    }
  }

  submitPossibleDates() {
    let dateArray: string[] = [];
    Array.from(document.getElementsByClassName("clicked")).forEach(element => {
      dateArray.push(element.id)
    })
    this.userService.submitPossibleDatesFromPrivateEvent(dateArray, this.event);
  }
}
