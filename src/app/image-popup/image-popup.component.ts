import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataTransfer} from "../models/DataTransfer";


@Component({
  selector: 'app-event-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:DataTransfer,
    private dialogRef: MatDialogRef<ImagePopupComponent>
  ) {
  }

  ngOnInit(): void {
  }

  submit(){
    this.dialogRef.close(this.data.itemList);
  }

  processFile(imageInput: HTMLInputElement) {
    if (imageInput.files != null){
      const file = imageInput.files[0];
      const reader = new FileReader();

    }

  }
}
