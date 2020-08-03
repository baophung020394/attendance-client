import { Component, OnInit } from '@angular/core';
import { AttandanceService } from 'src/app/services/attandance.service';

@Component({
  selector: 'app-list-attandance',
  templateUrl: './list-attandance.component.html',
  styleUrls: ['./list-attandance.component.scss']
})
export class ListAttandanceComponent implements OnInit {

  constructor(
    private attandanceService: AttandanceService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.attandanceService.getList().subscribe(res => {
      console.log(res)
    })
  }
}
