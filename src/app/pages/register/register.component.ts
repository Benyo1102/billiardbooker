import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    })
  });

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Ellenőrizzük, hogy az űrlap érvényes-e
    if (this.signUpForm.invalid) {
        console.error('Az űrlap nem érvényes');
        return; // Korai kilépés, ha az űrlap érvénytelen
    }

    // Kinyerjük az email és jelszó értékeit
    const emailValue = this.signUpForm.get('email')?.value ?? '';
    const passwordValue = this.signUpForm.get('password')?.value ?? '';

    // Ellenőrizzük, hogy az email és jelszó mezők nem üresek-e
    if (!emailValue || !passwordValue) {
        console.error('Email és jelszó megadása kötelező');
        return;
    }

    // Regisztráció a Firebase segítségével
    this.authService.signup(emailValue, passwordValue).then(cred => {
        // Ha nem kaptunk vissza felhasználót, hibaüzenetet jelenítünk meg
        if (!cred.user) {
            console.error('Nem érkeztek felhasználói hitelesítő adatok');
            return;
        }

        // Sikeres regisztráció esetén naplózzuk az űrlap adatait
        console.log(this.signUpForm.value);

        // Felhasználói objektum létrehozása
        const user: User = {
            id: cred.user.uid, // A felhasználó azonosítója
            email: emailValue, // Email cím
            username: emailValue.split('@')[0], // Felhasználónév az email cím alapján
            name: {
                firstname: this.signUpForm.get('name')?.get('firstname')?.value ?? '',
                lastname: this.signUpForm.get('name')?.get('lastname')?.value ?? ''
            }
        };

        // Felhasználó adatbázisba való mentése
        this.userService.create(user).then(() => {
            console.log('A felhasználó sikeresen hozzáadva!');
        }).catch(error => {
            console.error('Hiba történt a felhasználó hozzáadása során:', error);
        });
    }).catch(error => {
        console.error('Regisztrációs hiba:', error);
    });
}

  goBack() {
    this.location.back();
  }
}