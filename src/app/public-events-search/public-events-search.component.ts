import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventSearchService} from "../services/event-search.service";
import {PublicEvent} from "../models/PublicEvent";

@Component({
  selector: 'app-public-events-search',
  templateUrl: './public-events-search.component.html',
  styleUrls: ['./public-events-search.component.scss']
})
export class PublicEventsSearchComponent implements OnInit {

  constructor(private route : ActivatedRoute, private searchService : EventSearchService) { }

  private searchValue = "";
  public events : PublicEvent[] = [];

  ngOnInit(): void {
    this.searchValue = this.route.snapshot.queryParamMap.get("search") || "";
    this.events = this.searchService.searchEvents(this.searchValue);
  }

}
