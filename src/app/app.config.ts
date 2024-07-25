import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"breakfake-54baa","appId":"1:374592407666:web:6001353bef3187bbb21aeb","storageBucket":"breakfake-54baa.appspot.com","apiKey":"AIzaSyAiqDIFGjQMx03xnEs9W4FbqoXrugZw7xo","authDomain":"breakfake-54baa.firebaseapp.com","messagingSenderId":"374592407666"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
