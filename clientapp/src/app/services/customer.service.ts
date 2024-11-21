import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5016/api/Customers';

  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Array<ICustomer>> {
    return this.http.get<Array<ICustomer>>(this.apiUrl);
  }

  public createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.apiUrl, customer);
  }

  public updateCustomer(customer: ICustomer): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${customer.id}`, customer);
  }

  public deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
