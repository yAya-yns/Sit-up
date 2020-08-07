import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TfposeService {

  constructor(private http: HttpClient) { }
  
  call() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');

    return this.http.get(
      environment.endpoint,
      {headers}
    )
  }
  img() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');

    return this.http.get(
      environment.img,
      {headers}
    )
  }
  close() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');

    return this.http.get(
      environment.close,
      {headers}
    )
  }
  video() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', '*/*');

    return this.http.get(
      environment.video,
      {headers}
    )
  }
}

