import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NavigationDialogComponent} from "../navigation-dialog/navigation-dialog.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  constructor(private dialog: MatDialog, public userService:UserService) { }

  public user : string = "";
  public navigationOn:boolean = false;

  ngOnInit() {
    this.user = this.userService.getUser() || "";
    this.navigationOn = this.userService.notificationEnabled();

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

  logOut() {
    this.userService.logOut();
  }

  notificationEvent() {
    this.userService.setNotifications(!this.navigationOn);
    this.navigationOn = !this.navigationOn;
  }
}
