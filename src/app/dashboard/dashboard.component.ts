import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router) { }

  public searchText = "";

  ngOnInit(): void {
  }

  navigateTo(route:string){
    this.router.navigateByUrl(route);
  }

  searchEvents() {
    this.router.navigate(['/search-events'], {queryParams: {search:'test'}});
  }
}
