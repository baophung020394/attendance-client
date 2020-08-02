import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentTime:any;
  constructor() { }

  ngOnInit(): void {
  }

  getClockIn() {
    let date = new Date();
    this.currentTime = date;
    console.log(this.currentTime)
  }
}
