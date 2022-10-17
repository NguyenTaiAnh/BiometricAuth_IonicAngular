import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

/* eslint-disable */
const { BiometricAuth } = Plugins;
@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
})

export class LockedPage implements OnInit {

  showFallback = true;
  password = '1234'
  hasBimmetricAuth = false;
  constructor(
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    const available = await BiometricAuth.isAvailable()
    this.hasBimmetricAuth = available.has;
    if (this.hasBimmetricAuth) {
      this.openBiometricAuth();
      
    } else {
      // biometric not available
    }
  }

  async openBiometricAuth(){
    const authResult = await BiometricAuth.verify(
      {
        resason: "your session timed out",
        title: 'Your session timed out',
      }
    );
    if(authResult.verified){
      this.dismissLockScreen()
    }
  }

  unlock(){
    if(this.password === '1234'){
      this.dismissLockScreen();
    }
  }

  dismissLockScreen(){
    this.modalCtrl.dismiss({reset: true})
  }

}
