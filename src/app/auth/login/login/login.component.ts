import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe()
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password)
  }

}
