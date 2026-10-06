// Pont vers les modules natifs Android (localisation, notification, navigateur, liens).
// Ce fichier est assemblé en www/native.js par la compilation (esbuild).
import { registerPlugin } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');
window.RubaliseNative = { App, Browser, BackgroundGeolocation, Geolocation, LocalNotifications };
