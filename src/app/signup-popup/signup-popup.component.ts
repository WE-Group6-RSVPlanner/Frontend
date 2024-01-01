import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.scss']
})
export class SignupPopupComponent implements OnInit {

  public signUpForm:any;
  constructor(
    private dialogRef: MatDialogRef<SignupPopupComponent>,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group(
      {
        name : ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }
    )
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.signUpForm.valid){
      this.dialogRef.close(this.signUpForm.value);
    }
  }
}
