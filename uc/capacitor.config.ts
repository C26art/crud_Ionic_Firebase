import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.login.capalogin',
  appName: 'uc',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "1065078746735-mtb1tacu9m885i3nn6vu4bfadvlon2l7.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true,
    }
  }
};

export default config;
