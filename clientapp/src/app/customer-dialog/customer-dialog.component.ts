import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerAction, ICustomer, ICustomerDialogData } from '../shared/interfaces/interfaces';
import { commonImports } from '../shared/common-imports';
import { materialImports } from '../shared/material-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortDatePipe } from '../shared/pipes/short-date.pipe';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss',
  imports: [commonImports, materialImports, ShortDatePipe, CustomerFormComponent],
})
export class CustomerDialogComponent implements OnInit {
  public customerForm!: FormGroup;
  public CustomerAction = CustomerAction;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICustomerDialogData,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.customerForm = this.fb.group({
      firstName: [this.setInitialFormValues(this.data.customer?.firstName), Validators.required],
      lastName: [this.setInitialFormValues(this.data.customer?.lastName), Validators.required],
      email: [this.setInitialFormValues(this.data.customer?.email), [Validators.required, Validators.email]],
    });
  }

  public ngOnInit(): void {
    if (this.data.action === CustomerAction.Delete) {
      this.customerForm.disable();
    }
  }

  public close(customer?: ICustomer): void {
    let newCustomer: ICustomer;
    if (this.data.action === CustomerAction.Edit) {
      newCustomer = {
        id: customer.id,
        firstName: this.customerForm.get('firstName').value,
        lastName: this.customerForm.get('lastName').value,
        email: this.customerForm.get('email').value,
        createdAt: customer.createdAt,
        updatedAt: DateTime.local(),
      };
    } else if (this.data.action === CustomerAction.Create) {
      newCustomer = {
        id: this.generateGUID(),
        firstName: this.customerForm.get('firstName').value,
        lastName: this.customerForm.get('lastName').value,
        email: this.customerForm.get('email').value,
        createdAt: DateTime.local(),
        updatedAt: DateTime.local(),
      };
    } else {
      newCustomer = customer
    }

    this.dialogRef.close(newCustomer);
  }

  private setInitialFormValues(value: string): string {
    return this.data.action === CustomerAction.Edit ? value : ''
  }

  private generateGUID(): string {
    const timestamp = DateTime.local().toFormat('hh:mm:ss');
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  }

}
