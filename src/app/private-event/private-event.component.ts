import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-private-event',
  templateUrl: './private-event.component.html',
  styleUrls: ['./private-event.component.scss']
})
export class PrivateEventComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public privateEventForm : any;
  private dateList : string = '';
  private participantList : string = '';

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
}
