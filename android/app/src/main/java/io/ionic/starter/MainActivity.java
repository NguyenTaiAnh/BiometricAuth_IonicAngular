package io.ionic.starter;

import android.os.Bundle;

import com.ahm.capacitor.biometric.BiometricAuth;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    ++ import com.ahm.capacitor.biometric.BiometricAuth;
//
//    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
//      ++ add(BiometricAuth.class);
//    }});
    registerPlugin(BiometricAuth.class);
  }
}
