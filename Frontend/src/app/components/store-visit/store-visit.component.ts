import { ValidatorsService } from './../../services/validators.service';
import { DialogData } from './../../models/DialogData';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-visit',
  templateUrl: './store-visit.component.html',
  styleUrls: ['./store-visit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoreVisitComponent implements OnInit {


  save_visit_form : FormGroup;

  constructor(public dialogRef: MatDialogRef<StoreVisitComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,private validators:ValidatorsService) { }

    onCancel(): void {
      this.dialogRef.close();
    }

    createFormGroup(): FormGroup{
      return new FormGroup({
          saveVisit: new FormControl("",[this.validators.save_visit_validator]),
       });
     }

  ngOnInit(): void {
    this.save_visit_form = this.createFormGroup();
  }

}
