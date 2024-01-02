import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EventPopupComponent} from "../event-popup/event-popup.component";
import {filter} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PrivateEvent} from "../models/PrivateEvent";
import {GenerateEventService} from "../services/generate-event.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-private-event',
  templateUrl: './private-event.component.html',
  styleUrls: ['./private-event.component.scss']
})
export class PrivateEventComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog:MatDialog,
    private snackBar:MatSnackBar,
    private eventService:GenerateEventService,
    private router:Router
  ) { }

  public privateEventForm : any;
  public dateList : string[] = [];
  public participantList : string[] = [];
  private dialogRef: MatDialogRef<EventPopupComponent> | undefined;

  ngOnInit(): void {
    this.privateEventForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      title: ['',[Validators.required]],
      description: [''],
      dateList: [{value:this.dateList,disabled:true}],
      participantList: [{value:this.participantList,disabled:true}]
    })
  }

  addDate(){
    this.dialogRef = this.dialog.open(EventPopupComponent,{
      panelClass: 'input-dialog',
      data: {name: 'Possible Dates', itemList: this.dateList, isDate:true}
    })

    this.dialogRef.afterClosed().pipe(
      filter(itemList => itemList)
    ).subscribe(itemList => {
      this.dateList = itemList;
      this.privateEventForm.get('dateList').setValue(itemList);
    })
  }

  addParticipants(){
    this.dialogRef = this.dialog.open(EventPopupComponent,{
      panelClass: 'input-dialog',
      data: {name: 'Participants', itemList: this.participantList, isDate:false},
    })

    this.dialogRef.afterClosed().pipe(
      filter(itemList => itemList)
    ).subscribe(itemList => {
      this.participantList = itemList;
      this.privateEventForm.get('participantList').setValue(itemList);
    })
  }

  createEvent(){
    if(this.privateEventForm.valid && this.dateValid() && this.participantsValid()){
      let newEvent:PrivateEvent = {
        email: this.privateEventForm.value.email,
        eventDates: this.privateEventForm.value.dateList,
        eventDescription: this.privateEventForm.value.description,
        eventTitle: this.privateEventForm.value.title,
        name: this.privateEventForm.value.name,
        participants: this.privateEventForm.value.participantList
      }
      //TODO: handle return of service
      let returnCode = this.eventService.createPrivateEvent(newEvent);
      console.log(returnCode);
      this.snackBar.open("Your event was created successfully!", "Close")
      this.router.navigate(["/"]);
    }else{
      this.snackBar.open("Please fill out the form!", "Close")
    }
  }

  private dateValid() {
    if(this.dateList.length == 0) {
      this.snackBar.open("Please enter at least one date!", "Close")
      return false;
    }
    return true;
  }

  private participantsValid() {
    if(this.participantList.length == 0) {
      this.snackBar.open("Are you sure, you wont invite someone?", "Close")
      return false;
    }
    return true;
  }
}
