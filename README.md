# login with face and fingerprint

package: https://github.com/arielhernandezmusa/capacitor-biometric-auth

## Installation

* `npm i capacitor-biometric-auth`
* `yarn add capacitor-biometric-auth`

## Setup
Don't for get to run ```npx cap sync``` before doing the next steps.

* `ionic g page login`
* `ionic g page inside`
* `ionic g page locked`
* `ionic g service access`

ionic build
npx cap add ios
npx cap add android

### Android
To get android working please add this code to your MainActivity file.

> MainActivity.java
```diff
++ import com.ahm.capacitor.biometric.BiometricAuth;

this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
++ add(BiometricAuth.class);
}});
```

>or MainActivity.java:
```diff
++ import com.ahm.capacitor.biometric.BiometricAuth;

protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ++ registerPlugin(BiometricAuth.class);
  }
```

### IOS

> info.plist
```diff
    <key>NSFaceIDUsageDescription</key>
	<string>Use Fade ID to unlock your app</string>
```diff


```

### Coding

> access.service.ts 

```diff
    import { Injectable } from '@angular/core';
    import { BehaviorSubject } from 'rxjs';
    import { ModalController, Platform } from '@ionic/angular';
    import { LockedPage } from './locked/locked.page';

    @Injectable({
        rovidedIn: 'root'
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
```diff

> login.page.html

```diff
    <ion-content>
        <ion-button expand="full" routerLink="/inside" >Login</ion-button>
    </ion-content>
```diff

> inside.page.ts

```diff
    import { AccessService } from './../access.service';
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'app-inside',
        templateUrl: './inside.page.html',
        styleUrls: ['./inside.page.scss'],
    })
    export class InsidePage implements OnInit {
        /* eslint-disable */
        logoutTimer = this.accessService.logoutTimer.asObservable()
        constructor(private accessService: AccessService) { }

        ngOnInit() {
        }
        ionViewDidEnter(){
            this.accessService.resetLogoutTimer();
        }
    }
```diff

> inside.page.html

```diff
    <ion-footer>
        <ion-toolbar color="secondary">
            <ion-row>
                <ion-col size="12" class="ion-text-center">
                Automactic logout in: {{ (logoutTimer | async)*1000 | date: 'mm:ss' }}
                </ion-col>
            </ion-row>

        </ion-toolbar>
    </ion-footer>
```diff

> inside.page.html

```diff
    <ion-footer>
        <ion-toolbar color="secondary">
            <ion-row>
                <ion-col size="12" class="ion-text-center">
                Automactic logout in: {{ (logoutTimer | async)*1000 | date: 'mm:ss' }}
                </ion-col>
            </ion-row>

        </ion-toolbar>
    </ion-footer>
```diff

> locked.page.ts

```diff
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
```diff

> locked.page.html

```diff
<ion-header>
  <ion-toolbar color="warning">
    <ion-title>locked</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="fallback">
    <ion-icon name="lock-closed-outline" size="large"></ion-icon>
    <ion-input [(ngModel)]="password" type="password" placeholder="Password"></ion-input>
    <ion-button (click)="unlock()" expand="full">
      Unlock with code
    </ion-button>
    <ion-button (click)="openBiometricAuth()" expand="full">
      <ion-icon name="finger-print" slot="icon-only"></ion-icon>
    </ion-button>
  </div>
</ion-content>
```diff

> locked.page.scss

```diff
.fallback{
    margin: 20px;
    text-align: center;
}

ion-input{
    background: #efecef;
    border-radius: 20px;
    --padding-start:20px;
}
```diff