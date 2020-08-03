import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { AttandanceService } from 'src/app/services/attandance.service';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {
  objClockin: any;
  clockInForm: FormGroup;
  currentTime: any;
  objClockIn: any[] = [];

  // ipaddress = '';
  latitude = '';
  longitude = '';
  title = '';
  ipaddress: '';
  // tslint:disable-next-line: ban-types
  location: Object;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private locationService: LocationService,
    private attandanceService: AttandanceService
  ) {
  }
  ngOnInit(): void {
    this.getCurrentTime();
    this.locationService.getIpAddress().subscribe(data => {
      this.ipaddress = data['ip'];
      // this.title = data.country_name;
      this.locationService.getGEOLocation(this.ipaddress).subscribe(res => {
        console.log(res);
        this.title = res.country_name;
        this.longitude = res.longitude;
        this.latitude = res.latitude;
      });
    });

    this.clockInForm = this.fb.group({
      clockIn:  new FormControl(''),
      clockOut:  new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      countryName: new FormControl(''),
      userId: new FormControl('')
    })
    setInterval(( ) => { this.getCurrentTime();}, 1000);
  }
  getCurrentTime() {
    const date = new Date();
    this.currentTime = date;
  }
  submit() {
    let idUser =  localStorage.getItem('user-id');
    this.clockInForm.controls.clockIn.setValue(this.currentTime);
    this.clockInForm.controls.clockOut.setValue(this.currentTime);
    this.clockInForm.controls.latitude.setValue(this.latitude);
    this.clockInForm.controls.longitude.setValue(this.longitude);
    this.clockInForm.controls.countryName.setValue(this.title);
    this.clockInForm.controls.userId.setValue(idUser);
    this.attandanceService.addClockIn(this.clockInForm.value).subscribe(res => {
      if (res) {
        this.router.navigate(['list'])
      }
    })
  }
}
