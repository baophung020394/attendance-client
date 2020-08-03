import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  // tslint:disable-next-line: typedef
  getClockIn() {
    this.router.navigate(['clock-in'])
  }
  getClockOut() {
    this.router.navigate(['clock-out'])
  }
  getListView() {
    this.router.navigate(['list'])
  }

  
}
