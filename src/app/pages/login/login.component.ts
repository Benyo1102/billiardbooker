import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true
  });
  password = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true
  });
  errorMessage: string = '';
  constructor(private auth: AuthService, title: Title) {
    title.setTitle("Biliard-Booker - Login");
   }

  async onLoginPressed(): Promise<void> {
    this.email.markAsDirty();
    this.password.markAsDirty();

    if (this.email.invalid || this.password.invalid)
      return;

    try {
      await this.auth.login(this.email.value, this.password.value);
      location.reload();
    } catch (error) {
      console.error('Error logging in, Invalid email or password:', error);
      this.errorMessage = 'Nem megfelelő e-mail cím vagy jelszó!';
    }
  }
}
