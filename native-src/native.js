// Pont vers les modules natifs Android (notification, navigateur, liens).
// Ce fichier est assemblé en www/native.js par la compilation (esbuild).
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { LocalNotifications } from '@capacitor/local-notifications';

window.RubaliseNative = { App, Browser, LocalNotifications };
