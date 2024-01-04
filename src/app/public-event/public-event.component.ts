import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GenerateEventService} from "../services/generate-event.service";
import {Router} from "@angular/router";
import {PublicEvent} from "../models/PublicEvent";

@Component({
  selector: 'app-public-event',
  templateUrl: './public-event.component.html',
  styleUrls: ['./public-event.component.scss']
})
export class PublicEventComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog:MatDialog,
    private snackBar:MatSnackBar,
    private eventService:GenerateEventService,
    private router:Router
  ) { }

  public publicEventForm : any;

  ngOnInit(): void {
    this.publicEventForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      title: ['',[Validators.required]],
      description: [''],
      date: ['',[Validators.required]],
      location: [''],
      locationDescription: [''],
    })
  }

  createEvent(){
    if(this.publicEventForm.valid){
      let newEvent:PublicEvent = {
        email: this.publicEventForm.value.email,
        eventDate: this.formatDate(this.publicEventForm.value.date),
        eventDescription: this.publicEventForm.value.description,
        eventLocation: this.publicEventForm.value.location,
        eventTitle: this.publicEventForm.value.title,
        locationDescription: this.publicEventForm.value.locationDescription,
        name: this.publicEventForm.value.name,
        participants: 1
      }

      this.eventService.createPublicEvent(newEvent)
          .subscribe(response => {
            console.log(response);
            this.snackBar.open("Your event was created successfully!", "Close")
          }, error => {
            console.log("ERROR CODE: "+ error.status)
            console.log(error.message)
            this.snackBar.open("Ooops, something went wrong!", "Close")
          })
      this.router.navigate(["/"]);

    }else{
      this.snackBar.open("Please fill out the form!", "Close")
    }
  }

  private formatDate(rawDate: string) {
    const convertedRawDate = new Date(rawDate);

    const year = convertedRawDate.getFullYear();
    const month = ('0' + (convertedRawDate.getMonth() + 1)).slice(-2);
    const day = ('0' + convertedRawDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
