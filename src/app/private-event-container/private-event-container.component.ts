import {Component, Input, OnInit} from '@angular/core';
import {PrivateEvent} from "../models/PrivateEvent";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-private-event-container',
  templateUrl: './private-event-container.component.html',
  styleUrls: ['./private-event-container.component.scss']
})
export class PrivateEventContainerComponent implements OnInit {

  @Input()
  event!:PrivateEvent;

  constructor(private userService:UserService,
              private snackBar:MatSnackBar) { }

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

    this.userService.submitPossibleDatesFromPrivateEvent(dateArray, this.event)
        .subscribe(response => {
          console.log(response);
          this.snackBar.open("You successfully signed up for: " + dateArray, "Thanks!")
        }, error => {
          console.log(error.error.error)
          console.log("ERROR CODE: " + error.status)
          console.log(error)
          this.snackBar.open("Ooops, something went wrong!", "Close")
        })
  }

  getYear(date: string) {
    const split = date.split("-");
    return split[0];
  }

  getDayMonth(date:string){
    const split = date.split("-");
    return `${split[1]}/${split[2]}`;
  }
}
