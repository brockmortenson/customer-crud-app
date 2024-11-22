import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../services/customer.service';
import { CustomerAction, ICustomer, ICustomerDialogData } from '../shared/interfaces/interfaces';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { commonImports } from '../shared/common-imports';
import { materialImports } from '../shared/material-imports';
import { Subscription, take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ShortDatePipe } from '../shared/pipes/short-date.pipe';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [commonImports, materialImports, ShortDatePipe],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  
  public dataSource: MatTableDataSource<ICustomer> = new MatTableDataSource<ICustomer>();
  public lastSelectedId: string = '';
  public CustomerAction = CustomerAction;
  public readonly displayedColumns: Array<string> = ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'actions'];

  private readonly subscription: Subscription = new Subscription();

  constructor(private customerService: CustomerService, private dialog: MatDialog) {}

  public ngOnInit() {
    this.loadCustomers();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openDialog(action: CustomerAction, customer?: ICustomer): void {
    const data: ICustomerDialogData = { action, customer };
    if (customer) {
      this.setLastSelected(customer);
    }

    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      data,
      panelClass: action === CustomerAction.Delete ? 'delete-customer-dialog': 'customer-dialog',
    });

    dialogRef.afterClosed().subscribe((customer: ICustomer) => {
      if (customer) {
        switch (action) {
          case CustomerAction.Create:
            this.setLastSelected(customer)
            this.customerService.createCustomer(customer).pipe(take(1)).subscribe(() => this.loadCustomers());
            break;
          case CustomerAction.Delete:
            customer.isLastSelected = false;
            sessionStorage.clear();
            this.customerService.deleteCustomer(customer.id).pipe(take(1)).subscribe(() => this.loadCustomers());
            break;
          case CustomerAction.Edit:
            this.customerService.updateCustomer(customer).pipe(take(1)).subscribe(() => this.loadCustomers());
            break;
          default:
            break;
        }
      }
    });
  }

  private loadCustomers() {
    this.subscription.add(this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers;
      this.selectLatest();
      this.refreshPaginator();
    }));
  }

  private setLastSelected(customer: ICustomer): void {
    const previousSelectedId = sessionStorage.getItem('LAST_SELECTED');
    const previousSelectedCustomer = this.dataSource.data.find((customer) => customer.id === previousSelectedId);
    if (previousSelectedCustomer) {
      previousSelectedCustomer.isLastSelected = false;
    }

    sessionStorage.clear();
    sessionStorage.setItem('LAST_SELECTED', customer.id);
    customer.isLastSelected = true;
  }

  private selectLatest(): void {
    const selectedId = sessionStorage.getItem('LAST_SELECTED');
    const selectedCustomer = this.dataSource.data.find((customer) => customer.id === selectedId);

    if (selectedCustomer) {
      selectedCustomer.isLastSelected = true;
    }
  }

  private refreshPaginator(): void {
    this.dataSource.paginator = this.paginator;
  }
}
