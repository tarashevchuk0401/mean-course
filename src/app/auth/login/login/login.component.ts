import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  isLoading : boolean = false;

  onLogin(form: NgForm){
    console.log(form.value);
  }
  
}
