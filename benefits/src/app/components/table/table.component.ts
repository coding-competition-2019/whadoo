import {Component, Input, OnInit} from '@angular/core';
import {Place} from "../../entities/places";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'address', 'distance'];
  displayedColumns: string[] = ['name', 'address', 'distance'];

  @Input()
  results: Place[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
