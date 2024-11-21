import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../services/customer.service';
import { ICustomer } from '../shared/interfaces/interfaces';
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
  public readonly displayedColumns: Array<string> = ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'actions'];

  private readonly subscription: Subscription = new Subscription();

  constructor(private customerService: CustomerService, private dialog: MatDialog) {}

  public ngOnInit() {
    this.loadCustomers();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openDialog(action: string, customer?: ICustomer): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      data: { action, customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'create') {
          this.customerService.createCustomer(result).subscribe(() => this.loadCustomers());
        } else if (action === 'update') {
          this.customerService.updateCustomer(result).subscribe(() => this.loadCustomers());
        }
      }
    });
  }

  private loadCustomers() {
    this.subscription.add(this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers;
      this.refreshPaginator();
      console.log(this.dataSource.data);
    }));
  }

  private deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id).pipe(take(1)).subscribe(() => this.loadCustomers());
  }

  private refreshPaginator(): void {
    this.dataSource.paginator = this.paginator;
  }
}
