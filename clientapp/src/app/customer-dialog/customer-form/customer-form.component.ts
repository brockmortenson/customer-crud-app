import { Component, Input } from '@angular/core';
import { commonImports } from '../../shared/common-imports';
import { materialImports } from '../../shared/material-imports';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  imports: [commonImports, materialImports],
})
export class CustomerFormComponent {
  @Input() public customerForm!: FormGroup;

  public get email(): AbstractControl {
    return this.customerForm.get('email');
  }
}
