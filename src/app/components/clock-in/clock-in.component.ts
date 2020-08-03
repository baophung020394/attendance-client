import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { AttandanceService } from 'src/app/services/attandance.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  videoWidth = 0;
  videoHeight = 0;
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };

  objClockin: any;
  clockInForm: FormGroup;
  currentTime: any;
  objClockIn: any[] = [];

  // ipaddress = '';
  latitude = '';
  longitude = '';
  title = '';
  ipaddress: '';
  flag = '';
  // tslint:disable-next-line: ban-types
  location: Object;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private locationService: LocationService,
    private attandanceService: AttandanceService,
    private renderer: Renderer2,
    private _location: Location
  ) {
  }
  ngOnInit(): void {
    this.startCamera();
    this.getCurrentTime();
    this.locationService.getIpAddress().subscribe(data => {
      this.ipaddress = data['ip'];
      // this.title = data.country_name;
      this.locationService.getGEOLocation(this.ipaddress).subscribe(res => {
        console.log(res);
        this.title = res.country_name;
        this.longitude = res.longitude;
        this.latitude = res.latitude;
        this.flag = res.country_flag;
      });
    });

    this.clockInForm = this.fb.group({
      clockIn: new FormControl(''),
      clockOut: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      countryName: new FormControl(''),
      userId: new FormControl(''),
      userName: new FormControl('')
    })
    setInterval(() => { this.getCurrentTime(); }, 1000);
  }
  getCurrentTime() {
    const date = new Date();
    this.currentTime = date;
  }
  submit() {
    let idUser = localStorage.getItem('user-id');
    let userName = JSON.parse(localStorage.getItem('user'));
    this.clockInForm.controls.clockIn.setValue(this.currentTime);
    this.clockInForm.controls.clockOut.setValue(this.currentTime);
    this.clockInForm.controls.latitude.setValue(this.latitude);
    this.clockInForm.controls.longitude.setValue(this.longitude);
    this.clockInForm.controls.countryName.setValue(this.title);
    this.clockInForm.controls.userId.setValue(idUser);
    this.clockInForm.controls.userName.setValue(userName.name);
    this.attandanceService.addClockIn(this.clockInForm.value).subscribe(res => {
      if (res) {
        this.router.navigate(['list']);
      }
    })
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
  }

  backClicked() {
    this._location.back();
  }

  handleError(error) {
    console.log('Error: ', error);
  }


}
