import { TfposeService } from './../tfpose.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
// import { VideoPlayer } from '@ionic-native/video-player/ngx';
 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

 

export class homePage implements OnInit {

  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = 'none';
  setZoom = 1;
  flashMode = 'off';
  isToBack = false;
  imageNames = [];
  connected = false;
  correct = true;

  img: any ="assets/video/demo.mp4";

  

  constructor(private sanitizer: DomSanitizer, private cameraPreview: CameraPreview, private file: File, private pose: TfposeService) {
  }
  
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 20,
    y: 100,
    width: 300,
    height: 250,
    camera: "front",
    tapPhoto: true,
    previewDrag: true,
    toBack: false,
    alpha: 1,
    tapFocus: false,
    disableExifHeaderStripping: false
  };
  photo: SafeResourceUrl;


  ngOnInit() {
  }

  startCameraAbove() {

    this.connected = true;
    this.pose.call().subscribe(
      (ret) => {
        console.log('success')
      }, (err) => {
        console.log(err)
      }
    )
    
    this.generateImageName('giphy', 24);
    showImageInVideo(this.imageNames, 0)
    this.cameraPreview.startCamera(this.cameraPreviewOpts);
    this.isToBack = false;
    this.cameraPreview.stopCamera().then(() => {
      this.isToBack = false;
    })
  }

  load(){
    this.pose.video().subscribe(
      (ret) => {
        this.img = ret
        console.log('success')
      }, (err) => {
        console.log(err)
      }
    )
  }

  stopCamera() {
    this.connected = false;
    this.pose.close().subscribe(
      (ret) => {
        console.log('success')
      }, (err) => {
        console.log(err)
      }
    )
  }

  generateImageName(name, number) {
    for (let i = 0; i < number; i++){
      this.imageNames.push(name + '-' + i + '.jpg');
    }
  }

}

function showImageInVideo(images, i) {
  if (i < images.length) {
    document.getElementById('video').style.background = "url('../../assets/giphy-0/" + images[i] + "')";
    setTimeout(showImageInVideo.bind(null,images, i+1), 300)
  }else{
    document.getElementById('video').style.background = "";
  }
}

