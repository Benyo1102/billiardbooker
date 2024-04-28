import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firestore = inject(Firestore)

  constructor() { }

  public async setDummyData(): Promise<void> {
    const userDocRef = doc(this.firestore, `dummy/valami`);
    
    return await setDoc(userDocRef, {
      dummy: "adat",
      very: "cool"
    });
  }
}
