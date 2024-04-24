import { Injectable, inject } from '@angular/core';
import { sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged, Auth, User, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  public user: User | null;

  constructor() {
    this.user = null;
    onAuthStateChanged(this.auth, this.handleAuthStateChange);
  }

  // Lambda syntax is necessary here, because it's a callback function. (it doesn't work as a regular function)
  private handleAuthStateChange = (user: User | null): void => {
    this.user = user;
    console.log("Email verified: ", user?.emailVerified ? "Yes" : "No");
    
    if (user) {
      console.log('User is logged in:', user);
    } else {
      console.log('User is logged out');
    }
  }

  async login(email: string, password: string): Promise<void> {
      await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
    this.sendConfirmationEmail(email);
  }

  private async sendConfirmationEmail(email: string): Promise<void> {
    if (!this.user)
      return;
    
    const actionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true
    };

    await sendEmailVerification(this.user, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  }
}
