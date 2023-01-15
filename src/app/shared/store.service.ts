import {EventEmitter, Injectable} from '@angular/core';
import { Sensor } from '../Sensor';
import { Sensorendata } from '../Sensorendata';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public dataHasUpdated = new EventEmitter();

  private _sensorenDaten: Sensorendata[] = [];
  public sensoren: Sensor[] = [];
  public isLoading = true;

  constructor() { }

  public set sensorenDaten(v: Sensorendata[]) {
    this._sensorenDaten = v;
    this.dataHasUpdated.emit();
  }

  public get sensorenDaten(): Sensorendata[] {
    return this._sensorenDaten;
  }
}
