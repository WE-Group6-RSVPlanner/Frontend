import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EventPopupComponent} from "../event-popup/event-popup.component";
import {filter} from "rxjs";


@Component({
  selector: 'app-private-event',
  templateUrl: './private-event.component.html',
  styleUrls: ['./private-event.component.scss']
})
export class PrivateEventComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public dialog:MatDialog) { }

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
}
