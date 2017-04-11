import { Component, ViewChild } from '@angular/core';

import { Platform,Nav } from 'ionic-angular';

import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth-provider/auth-provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage :any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public af:AngularFire,
    public authProvider:AuthProvider
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeApp()
    });

    
  }

  initializeApp() {
     this.af.auth.subscribe(auth => {
       if(auth) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
    });
  }

 
}
