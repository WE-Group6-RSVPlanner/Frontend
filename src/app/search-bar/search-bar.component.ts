import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router:Router, private route : ActivatedRoute) { }

  public searchValue:string = "";

  ngOnInit(): void {
    this.searchValue = this.route.snapshot.queryParamMap.get("search") || "";
  }

  searchEvents() {
    const searchValue = (<HTMLInputElement>document.getElementById("search-field")).value || "";
    this.router.navigate(['/search-events'], {queryParams: {search:searchValue}});
  }

}
