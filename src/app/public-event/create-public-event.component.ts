import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GenerateEventService} from "../services/generate-event.service";
import {Router} from "@angular/router";
import {PublicEvent} from "../models/PublicEvent";
import {GetEventImageService} from "../services/event-images.service";

@Component({
  selector: 'app-public-event',
  templateUrl: './create-public-event.component.html',
  styleUrls: ['./create-public-event.component.scss']
})
export class CreatePublicEventComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog:MatDialog,
    private snackBar:MatSnackBar,
    private eventService:GenerateEventService,
    private router:Router,
    private eventImageService:GetEventImageService
  ) { }

  public publicEventForm : any;
  selectedFile: File | null = null;

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadEventImage(eventID: String, file: File): void {
    console.log('trying to upload image');
    this.eventImageService.putEventImage(eventID, file)
      .subscribe(response => {
        console.log('Image uploaded successfully');
      }, error => {
        console.error('Error uploading image');
        console.log(error.message)
        console.log("ERROR CODE: " + error.status)
        console.log(error)
      });
  }

  createEvent(){
    if(this.publicEventForm.valid){
      let newEvent:PublicEvent = {
        eventID: "",
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

            if (this.selectedFile) {
              this.uploadEventImage(response.event_id, this.selectedFile);
            }

            this.snackBar.open("Your event was created successfully!", "Close")
          }, error => {
            console.log(error.message)
            console.log("ERROR CODE: " + error.status)
            console.log(error)
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
