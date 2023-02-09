import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environment/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiURLOrders = environment.apiUrl + 'orders'

  constructor(private http: HttpClient) { }

  // Get Order List
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  // Get Order by Id
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  // Create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order)
  }

  // update existing order
  updateOrder(orderStatus: { status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus)
  }

  // delete existing order
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`)
  }

  // Get Order count
  getOrderCount(): Observable<{ orderCount: number}> {
    return this.http.get<{ orderCount: number}>(`${this.apiURLOrders}/get/count`).pipe()
  }
  
  // Get Total sales count
  getTotalSalesCount(): Observable<{totalsales: number}> {
    return this.http.get<{totalsales: number}>(`${this.apiURLOrders}/get/totalsales`).pipe()
  }
}
