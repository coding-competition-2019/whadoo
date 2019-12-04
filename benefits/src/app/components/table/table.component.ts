import {Component, Inject, Input, OnInit} from '@angular/core';
import {Place} from '../../entities/places';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface FacilityDetailDialogData {
  place: Place;
}

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

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showDetail(place: Place): void {
    const dialogRef = this.dialog.open(FacilityDetailDialogComponent, {
      width: '768px',
      data: {place: place}
    });

    dialogRef.afterClosed().subscribe(result => {
      // pass
    });
  }
}


@Component({
  selector: 'facility-detail',
  templateUrl: 'facility-detail-dialog.html',
})
export class FacilityDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FacilityDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FacilityDetailDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
