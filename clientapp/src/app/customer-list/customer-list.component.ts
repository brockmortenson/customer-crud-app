import { Component } from '@angular/core';
import { ICustomer } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  constructor() { }
  
  public ngOnInit(): void {
    const lastSelectedId = sessionStorage.getItem('lastSelectedCustomer');
    if (lastSelectedId) {
      this.highlightCustomer(lastSelectedId);
    }
  }
  
  private highlightCustomer(id: string): void {
    // Highlight logic
  }

  private selectCustomer(customer: ICustomer): void {
    sessionStorage.setItem('lastSelectedCustomer', customer.id);
  }
}
