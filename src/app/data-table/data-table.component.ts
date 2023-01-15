import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {StoreService} from "../shared/store.service";
import {Subscription} from "rxjs";
import {BackendService} from "../shared/backend.service";
import { SensorPosition } from '../Sensor';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  public get SensorPosition() {
    return SensorPosition;
  }

  private storeServiceSubscription?: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'sensor', 'date', 'temperature', 'humidity', 'location', 'position', 'delete'];
  pageSizes = [5, 10, 20];
  constructor(private storeService: StoreService, private backendService: BackendService) {
  }

  ngAfterViewInit(): void {
    this.storeServiceSubscription = this.storeService.dataHasUpdated.subscribe(() =>{
      this.dataSource = new MatTableDataSource(this.storeService.sensorenDaten);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.storeServiceSubscription?.unsubscribe();
  }
  async deleteSensordata(id: number) {
    this.storeService.isLoading = true;
    await this.backendService.deleteSensorsDaten(id);
    this.storeService.isLoading = false;
  }
}
