import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataTransfer} from "../models/DataTransfer";
import {FormBuilder, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent implements OnInit {

  public newItemForm:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:DataTransfer,
    private dialogRef: MatDialogRef<EventPopupComponent>,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale : string
  ) {
    this.newItemForm = this.formBuilder.group({
      newItem : ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (!this.data.isDate){
      this.newItemForm.get('newItem').setValidators(Validators.email);
    }
  }

  addParticipant(){
    if (this.newItemForm.valid){
      if (this.data.isDate){
        const dateString = formatDate(this.newItemForm.value.newItem, 'dd.MM.YYYY', this.locale);
        this.data.itemList.push(dateString);
      }else {
        this.data.itemList.push(this.newItemForm.value.newItem);
      }
    }
  }

  submit(){
    this.dialogRef.close(this.data.itemList);
  }

}
