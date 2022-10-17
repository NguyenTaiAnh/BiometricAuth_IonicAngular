import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalController, Platform } from '@ionic/angular';
import { LockedPage } from './locked/locked.page';
@Injectable({
  providedIn: 'root'
})
export class AccessService {
  /* eslint-disable */
  logoutTimer = new BehaviorSubject(0);
  isLocked: true;

  constructor(
    private plt: Platform,
    private modalCtrl: ModalController,
  ) { 
    this.plt.pause.subscribe(() => {
      this.lockApp();
    })
  }
  
  resetLogoutTimer() {
    this.logoutTimer.next(3);
    this.decreaseLogoutTimer()
  }

  decreaseLogoutTimer() {
    setTimeout(() => {
      if(this.logoutTimer.value === 0){
        this.lockApp()
      }else{
        this.logoutTimer.next(this.logoutTimer.value - 1);
        this.decreaseLogoutTimer();
      }
    }, 1000);  
  }

  async lockApp(){
    const modal = await this.modalCtrl.create({ 
      component: LockedPage,
    })
    await modal.present()
    modal.onWillDismiss().then(result => {
      if(result.data && result.data.reset){
        this.resetLogoutTimer();  
      }
    })
  }
}
