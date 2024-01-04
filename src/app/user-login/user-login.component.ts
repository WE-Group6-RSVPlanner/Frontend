import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private userService:UserService) { }

  public error:boolean = false;

  public loginForm:any;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]]
    })
  }

  submit(){
    if (this.loginForm.valid){
      this.error = false;
      document.getElementById("login")!.classList.remove('error');
      this.userService.saveUser(this.loginForm.value.email);
      window.location.reload();
    }else {
      this.error = true;
      document.getElementById("login")!.classList.add('error');
    }
  }

}
