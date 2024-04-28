import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value ?? '';
    const password = this.signUpForm.get('password')?.value ?? '';
    if (email && password) {
      this.authService.signup(email, password).then(cred => {
        console.log("sikeres login");
        const user: User = {
          id: cred.user?.uid ?? '',
          email: email,
          username: email.split('@')[0],
          name: {
            firstname: this.signUpForm.get('name.firstname')?.value ?? '',
            lastname: this.signUpForm.get('name.lastname')?.value ?? ''
          }
        };
        this.userService.create(user).then(_ => {
          console.log('Sikeres hozzaadas!');
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
    } else {
      console.error('Email és jelszó kitöltése kötelező!');
    }
  }  

  goBack() {
    this.location.back();
  }
}