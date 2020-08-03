import { Component, OnInit } from '@angular/core';
import { AttandanceService } from 'src/app/services/attandance.service';
import { Attandance } from '../../models/Attandance.model';
@Component({
  selector: 'app-list-attandance',
  templateUrl: './list-attandance.component.html',
  styleUrls: ['./list-attandance.component.scss']
})
export class ListAttandanceComponent implements OnInit {

  listAttandance: Attandance[] = [];
  constructor(
    private attandanceService: AttandanceService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  // tslint:disable-next-line: typedef
  getList() {
    this.attandanceService.getList().subscribe(res => {
      console.log(res);
      this.listAttandance = res.attandances;
    })
  }
}
