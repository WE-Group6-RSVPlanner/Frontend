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
        eventDate: this.publicEventForm.value.date,
        eventDescription: this.publicEventForm.value.description,
        eventLocation: this.publicEventForm.value.location,
        eventTitle: this.publicEventForm.value.title,
        locationDescription: this.publicEventForm.value.locationDescription,
        name: this.publicEventForm.value.name

      }
      let returnCode = this.eventService.createPublicEvent(newEvent);
      console.log(returnCode);
      this.snackBar.open("Your event was created successfully!", "Close")
      this.router.navigate(["/"]);
    }else{
      this.snackBar.open("Please fill out the form!", "Close")
    }
  }


}
