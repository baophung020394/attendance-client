import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AttandanceService } from 'src/app/services/attandance.service';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clock-out',
  templateUrl: './clock-out.component.html',
  styleUrls: ['./clock-out.component.scss']
})
export class ClockOutComponent implements OnInit {

  objClockin: any;
  clockOutForm: FormGroup;
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

    this.clockOutForm = this.fb.group({
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
    this.clockOutForm.controls.clockIn.setValue(this.currentTime);
    this.clockOutForm.controls.clockOut.setValue(this.currentTime);
    this.clockOutForm.controls.latitude.setValue(this.latitude);
    this.clockOutForm.controls.longitude.setValue(this.longitude);
    this.clockOutForm.controls.countryName.setValue(this.title);
    this.clockOutForm.controls.userId.setValue(idUser);
    this.attandanceService.addClockIn(this.clockOutForm.value).subscribe(res => {
      if (res) {
        this.router.navigate(['list'])
      }
    })
  }
}
