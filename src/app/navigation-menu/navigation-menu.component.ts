import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NavigationDialogComponent} from "../navigation-dialog/navigation-dialog.component";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNavigation(activePageName : string) : void{
    const dialogRef = this.dialog.open(NavigationDialogComponent, {
      panelClass: "full-screen-dialog",
      data: {activeItem: activePageName}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("Dialog closed");
    })
  }

}
