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



  // async takePicture() {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: true,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Camera
  //   });

  //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
  // }
  ngOnInit() {
  }

  // playVideo(){
  //   this.videoPlayer.play('assets/video/1.mp4').then(() => {
  //   console.log('video completed');
  //   }).catch(err => {
  //   console.log(err);
  //   });
  // }
  startCameraAbove() {

    this.connected = true;
    this.pose.call().subscribe(
      (ret) => {
        console.log('success')
      }, (err) => {
        console.log(err)
      }
    )
    // this.generateImageName('giphy', 24);
    // showImageInVideo(this.imageNames, 0)
    // this.cameraPreview.startCamera(this.cameraPreviewOpts);
    // this.isToBack = false;
    // this.cameraPreview.stopCamera().then(() => {
    //   this.isToBack = false;
    // })
  }

  startCameraBelow() {
    this.cameraPreview.stopCamera().then(() => {
      this.isToBack = true;
      this.cameraPreview.startCamera({ x: 0, y: 50, width: window.screen.width, height: window.screen.height, camera: "front", tapPhoto: true, previewDrag: false, toBack: true });
    })
  }
  stopCamera() {
    this.cameraPreview.stopCamera();
  }

  takePicture() {
    this.cameraPreview.takePicture({
      width: 1280,
      height: 1280,
      quality: 85
    }).then((imageData) => {
      this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.IMAGE_PATH = 'assets/img/test.jpg';
    });
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  show() {
    this.cameraPreview.show();
  }

  hide() {
    this.cameraPreview.hide();
  }

  changeColorEffect() {
    this.cameraPreview.setColorEffect(this.colorEffect);
  }

  changeFlashMode() {
    this.cameraPreview.setFlashMode(this.flashMode);
  }

  changeZoom() {
    this.cameraPreview.setZoom(this.setZoom);
  }

  showSupportedPictureSizes() {
    this.cameraPreview.getSupportedPictureSizes().then((sizes) => {
      console.log(sizes);
    }, (err) => {
      console.log(err);
    });
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

