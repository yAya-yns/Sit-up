import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  first_time = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      if (this.first_time){
        this.router.navigateByUrl('land-in');
        // this.router.navigateByUrl('tabs');
        this.first_time = false;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
