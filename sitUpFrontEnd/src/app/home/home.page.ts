import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';

 

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
  

  constructor(private sanitizer: DomSanitizer, private cameraPreview: CameraPreview, private file: File) {
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
    this.generateImageName('giphy', 24);
    showImageInVideo(this.imageNames, 0)
    // this.showImageLikeVideo(0)
  }

  startCameraAbove() {

    this.cameraPreview.startCamera(this.cameraPreviewOpts);
    this.isToBack = false;
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

  showImageLikeVideo(i) {
    const images = ["giphy-0.jpg", "giphy-1.jpg", "giphy-2.jpg", "giphy-3.jpg", "giphy-4.jpg", "giphy-5.jpg", "giphy-6.jpg", "giphy-7.jpg", "giphy-8.jpg", "giphy-9.jpg", "giphy-10.jpg", "giphy-11.jpg", "giphy-12.jpg", "giphy-13.jpg", "giphy-14.jpg", "giphy-15.jpg", "giphy-16.jpg", "giphy-17.jpg", "giphy-18.jpg", "giphy-19.jpg", "giphy-20.jpg", "giphy-21.jpg", "giphy-22.jpg", "giphy-23.jpg"];
    if (i < images.length) {
      console.log(images)
      document.getElementById('video').style.background = "url('../../assets/giphy-0/" + images[i] + "')";
      setTimeout(this.showImageLikeVideo.bind(null, i+1), 300)
    }
  }

  // showImageLikeVideo(i) {
  //   setTimeout(() => {
  //     document.getElementById('video').style.background = "url('../../assets/giphy-0/" + this.imageNames[i] + "')";
  //   }, 3000);

  //   // while (i < this.imageNames.length) {
  //   //   console.log(i)
  //   //   setTimeout(() => {
  //   //     document.getElementById('video').style.background = "url('../../assets/giphy-0/" + this.imageNames[i] + "')";
  //   //   }, 3000);
  //   //   i++;
  //   // }
  // }
  
}

function showImageInVideo(images, i) {
  if (i < images.length) {
    console.log(images)
    document.getElementById('video').style.background = "url('../../assets/giphy-0/" + images[i] + "')";
    setTimeout(showImageInVideo.bind(null,images, i+1), 100)
  }
}