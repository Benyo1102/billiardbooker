import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm!: FormGroup;
  location: any;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required],
      name: this.formBuilder.group({
        
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]
      }),
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): { mismatch: true } | null {
    const passwordControl = formGroup.get('password');
    const rePasswordControl = formGroup.get('rePassword');
    
    if (!passwordControl || !rePasswordControl) {
      // Egy vagy több control nem található, visszatérünk null-lal
      return null;
    }
  
    const password = passwordControl.value;
    const rePassword = rePasswordControl.value;
  
    // Visszatérünk a megfelelő értékkel: ha nem egyeznek a jelszavak, akkor { mismatch: true }, különben null
    return password === rePassword ? null : { mismatch: true };
  }
  
  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form data: ', this.signUpForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  goBack() {
    this.location.back();
    console.log('Go back action triggered');
  }
}
