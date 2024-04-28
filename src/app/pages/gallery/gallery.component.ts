import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  constructor(title: Title, auth: AuthService) {
    title.setTitle("Biliard-Booker - Gallery");
  }

  images = [
    'assets/gallery/01.jpg',
    'assets/gallery/02.jpg',
    'assets/gallery/03.jpg',
    'assets/gallery/04.jpg',
    'assets/gallery/05.jpg',
    'assets/gallery/07.jpg',
    'assets/gallery/09.jpg',
    'assets/gallery/10.jpg',
    'assets/gallery/11.jpg',
    'assets/gallery/12.jpg',
  ];

  selectedImageUrl: string = '';

  openModal(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  closeModal() {
    this.selectedImageUrl = ''; // Állapot visszaállítása a modális bezárásakor
  }

}