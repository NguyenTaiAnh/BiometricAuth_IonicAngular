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

@TODO
