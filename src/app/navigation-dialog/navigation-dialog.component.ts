import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-navigation-dialog',
  templateUrl: './navigation-dialog.component.html',
  styleUrls: ['./navigation-dialog.component.scss']
})
export class NavigationDialogComponent implements OnInit {

  private activeSide:string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data:{activeItem : string}, private dialogRef: MatDialogRef<NavigationDialogComponent>) { }

  ngOnInit(): void {
    this.activeSide = this.data.activeItem;
    this.setActive(this.activeSide);
  }

  onClose():void{
    this.dialogRef.close();
  }

  setActive(activeItem : string){
    try {
      this.resetActiveItem();
      const navItem = document.getElementById(activeItem)!;
      navItem.classList.add("active");
    }catch (exception){
      console.log("No active item found");
    }
  }

  resetActiveItem(){
    const navItems = document.querySelectorAll(".nav-link");
    Array.from(navItems, navItem => navItem.classList.remove('active'));
  }
}
