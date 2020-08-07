import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {
  connected = false;
  correct = true;
  img: any ="assets/video/demo.mp4";

  constructor() { }

  ngOnInit() {
  }
  startCameraAbove() {
    this.connected = true;   
  }

  stopCamera() {
    this.connected = false;
  }

}
