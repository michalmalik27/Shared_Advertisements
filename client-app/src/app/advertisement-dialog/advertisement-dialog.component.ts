import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActionState, ActionStates } from 'src/app/actionState';
import { AdvertisementModel } from 'src/app/models/advertisementModel';
import { DataService } from 'src/app/services/data.service';

interface AdvertisementDialogData {
  action: string;
  advertisement: AdvertisementModel | undefined;
}

@Component({
  selector: 'advertisement-dialog',
  templateUrl: './advertisement-dialog.component.html',
  styleUrls: ['./advertisement-dialog.component.css'],
})
export class AdvertisementDialogComponent implements OnInit {
  advertisementForm: FormGroup = this.formBuilder.group({});
  categories: string[] = [];
  actionState: ActionState = <ActionState>{
    action: ActionStates.INIT,
    message: '',
  };

  http$: Observable<any> | undefined;

  constructor(
    public dialogRef: MatDialogRef<AdvertisementDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AdvertisementDialogData,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.advertisementForm = this.formBuilder.group({
      category: [
        this.data.advertisement?.category,
        [
          Validators.required
        ],
      ],
      title: [
        this.data.advertisement?.title,
        [
          Validators.required,
        ],
      ],
      image: [
        this.data.advertisement?.image
      ],
      description: [
        this.data.advertisement?.description,
        [
          Validators.required,
          Validators.maxLength(1000),
        ],
      ],
      createdByUserName: [
        this.data.advertisement?.createdByUserName,
        [
          Validators.required,
          Validators.maxLength(20),
        ],
      ],
    });
  }

  showFormControlError(key: string) {
    return (
      this.advertisementForm.controls[key].touched &&
      this.advertisementForm.controls[key].invalid
    );
  }

  showFormControlErrorType(key: string, error: string) {
    const errors = this.advertisementForm.controls[key].errors;
    return errors && errors[error];
  }

  doAction() {
    if (!this.advertisementForm.valid) {
      console.log('not valid');

      return;
    }

    this.actionState.action = ActionStates.IN_PROCESS;
    this.actionState.message = "Please wait to complete you'r action...";

    switch (this.data.action) {
      case 'Add':
        this.http$ = this.dataService.addAdvertisement(
          <AdvertisementModel>(this.advertisementForm.value)
        );
        break;
      case 'Update':
        this.http$ = this.dataService.updateAdvertisement(<AdvertisementModel>{
          id: this.data.advertisement!.id,
          ...this.advertisementForm.value,
        });
        break;
      case 'Delete':
        this.http$ = this.dataService.deleteAdvertisement(this.data.advertisement!);
        break;
      default:
        break;
    }
    this.http$!.subscribe(
      (data) => {
        this.dialogRef.close(this.data.action !== 'Delete' ? data : this.data.advertisement);
      },
      (err) => {
        console.log(err);
        this.actionState.message = err.error;
        this.actionState.action = ActionStates.IS_FAILED;
      }
    );
  }

  closeDialog() {
    this.actionState.action = ActionStates.INIT;
    this.actionState.message = '';

    this.dialogRef.close();
  }
}