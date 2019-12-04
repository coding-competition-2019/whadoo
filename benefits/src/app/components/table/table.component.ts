import {Component, Inject, Input, OnInit} from '@angular/core';
import {Place, Coords} from '../../entities/places';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LocationService} from '../../services/location.service';

export interface FacilityDetailDialogData {
  place: Place;
  myLocation: Coords;
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

  constructor(public dialog: MatDialog, public locationService: LocationService) {
  }

  ngOnInit() {
  }

  showDetail(place: Place): void {
    this.locationService.getLocation().then((location) => {
      const dialogRef = this.dialog.open(FacilityDetailDialogComponent, {
        width: '768px',
        data: {place: place, myLocation: location}
      });

      dialogRef.afterClosed().subscribe(result => {
        // pass
      });
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
