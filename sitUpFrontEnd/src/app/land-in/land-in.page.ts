import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-in',
  templateUrl: './land-in.page.html',
  styleUrls: ['./land-in.page.scss'],
})
export class LandInPage implements OnInit {

  constructor(public navCtrl: NavController, private router: Router) {
   }

  navigate(){
    this.router.navigate(['/tabs']);
  }

  ngOnInit() {
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
      console.log("1");
   }
  }
}
