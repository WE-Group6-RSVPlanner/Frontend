import {Component, Input, OnInit} from '@angular/core';
import {PrivateAttendeeAvailable, PrivateEvent} from "../models/PrivateEvent";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AttendeeAvailability} from "../models/backendModels/AttendeeAvailability";

@Component({
  selector: 'app-private-event-container',
  templateUrl: './private-event-container.component.html',
  styleUrls: ['./private-event-container.component.scss']
})
export class PrivateEventContainerComponent implements OnInit {
  availabilities: AttendeeAvailability[] | undefined;

  @Input()
  event!:PrivateEvent;

  public attendeeAvailability : PrivateAttendeeAvailable[] = [];
  public tableColumns : string[] = ['name'];
  public dateColumns : string[] = [];

  constructor(private userService:UserService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getAttendeeDetails(this.event)
      .subscribe( response => {
        this.availabilities = response;
        //response.forEach((availability: AttendeeAvailability) => {
        //  console.log(`Start Time: ${availability.start_time}, Status: ${availability.status}`);
        //});
        }, error => {
          console.log(error.error.error)
          console.log("ERROR CODE: " + error.status)
          console.log(error)
        }
      );

    this.attendeeAvailability = this.event.attendees.map(attendees => ({
      name: attendees.name,
      availability: attendees.attendee_availabilities
    }))
    this.attendeeAvailability[0].availability.forEach(value => {
      this.dateColumns.push(value.start_time);
    })
    this.tableColumns = this.tableColumns.concat(this.dateColumns);
  }

  selectDate(buttonId : string) {
    let buttonElement = document.getElementById(buttonId)!;
    if(buttonElement.classList.contains("accepted")) {
      buttonElement.classList.remove("accepted");
      buttonElement.classList.add("declined");
    } else if(buttonElement.classList.contains("declined")) {
      buttonElement.classList.remove("declined");
      buttonElement.classList.add("accepted");
    } else {
      buttonElement.classList.add("accepted");
    }
  }

  colourCalenderIcons(buttonId : string) {
    const matchingAvailability = this.availabilities ? this.availabilities.find((availability: AttendeeAvailability) => availability.start_time === buttonId) : null;
    return matchingAvailability ? matchingAvailability.status.toLowerCase() : "";
  }

  submitPossibleDates() {
    let dateArray: string[] = [];
    Array.from(document.getElementsByClassName("accepted")).forEach(element => {
      dateArray.push(element.id)
    })

    this.userService.submitPossibleDatesFromPrivateEvent(dateArray, this.event)
        .subscribe(response => {
          console.log(response);
          this.snackBar.open("Your events have been updated successfully!", "Thanks!")
        }, error => {
          console.log(error.error.error)
          console.log("ERROR CODE: " + error.status)
          console.log(error)
          if (this.event.email == this.userService.getUser()){
            this.snackBar.open("You organized it, don't leave your own event!", "Close")
          }else {
            this.snackBar.open("Ooops, something went wrong!", "Close")
          }
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
