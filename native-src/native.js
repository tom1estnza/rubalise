   import { registerPlugin } from '@capacitor/core';
   import { LocalNotifications } from '@capacitor/local-notifications';

   const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');
   window.RubaliseNative = { BackgroundGeolocation, LocalNotifications };
