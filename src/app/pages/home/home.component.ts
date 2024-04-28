import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(title: Title, auth: AuthService) {
    title.setTitle("Biliard-Booker - Home!");
  }
}
