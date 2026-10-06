// Pont vers les modules natifs Android (localisation, notification).
// Ce fichier est assemblé en www/native.js par la compilation (esbuild).
import { registerPlugin } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');
window.RubaliseNative = { BackgroundGeolocation, Geolocation, LocalNotifications };
