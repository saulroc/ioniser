import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Game',
      url: '/folder/Game',
      icon: 'game-controller'
    },
    {
      title: 'High Scores',
      url: '/high-score',
      icon: 'podium'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'mail'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public userName: String = "Player 1";
  public urlFoto: string = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afa: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => path.toLowerCase().startsWith(page.title.toLowerCase()));
    }
    this.afa.authState.subscribe(user => {
        if (!user) {
          this.userName = "Player 1";
          this.urlFoto = "";
          return
        }

        this.userName = user.displayName ? user.displayName : user.email.split('@')[0];
        this.urlFoto = user.photoURL;
    });
  }

  

}
