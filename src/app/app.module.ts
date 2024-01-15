import { NgModule, importProvidersFrom } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { markedOptionsFactory } from './markdown.config';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'benmunrome',
          appId: '1:69772176473:web:b3222d577c077a39705548',
          storageBucket: 'benmunrome.appspot.com',
          apiKey: 'AIzaSyDeZvXjIJfAV-b4oo58xRFliZqBAfjc2NM',
          authDomain: 'benmunrome.firebaseapp.com',
          messagingSenderId: '69772176473',
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideHttpClient(withFetch()),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
