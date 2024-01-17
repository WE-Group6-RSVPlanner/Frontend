import { Component, OnInit, Input } from '@angular/core';
import {PublicEvent} from "../models/PublicEvent";
import {GetEventImageService} from "../services/event-images.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-public-event-container',
  templateUrl: './public-event-container.component.html',
  styleUrls: ['./public-event-container.component.scss'],
})
export class PublicEventContainerComponent implements OnInit {

  @Input()
  event!:PublicEvent;
  imageUrl!: SafeUrl;

  constructor(
    private eventImageService:GetEventImageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getEventImage();
  }

  getEventImage() {
    if(this.event) {
      this.eventImageService.getEventImage(this.event)
        .subscribe(blob => {
          const objectURL = URL.createObjectURL(blob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error => {
          console.log("Error fetching image")
          console.log(error.error.error)
          console.log("ERROR CODE: " + error.status)
          console.log(error)
        }
      );
    }
  }
}
