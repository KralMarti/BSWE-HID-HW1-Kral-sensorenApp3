import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }
  public sensorenDataForm: any;

  ngOnInit(): void {
    this.sensorenDataForm = this.formBuilder.group({
      sensorId: [0, [ Validators.required ] ],
      temperature: ['', [ Validators.required, Validators.min(-50), Validators.max(60) ] ],
      humidity: ['', [ Validators.required, Validators.min(0), Validators.max(100) ] ],
      date:  [null, [ Validators.required ] ]
    });
  }

  async onSubmit() {
    if(this.sensorenDataForm?.valid) {
      this.storeService.isLoading = true;
      await this.backendService.addSensorsData(this.sensorenDataForm.value);
      this.sensorenDataForm.reset()
      this.storeService.isLoading = false;
    }





  }
}
