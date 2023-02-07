import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@ishwar-eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = []
  orderStatus = ORDER_STATUS
  
  constructor(
              private ordersService: OrdersService, 
              private router: Router, 
              private confirmationService: ConfirmationService,
              private toaster: MessageService
            ) {}

  ngOnInit() {
    this._getOrders();  
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((res) => {
      this.orders = res
    })
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          (response) => {
            this._getOrders()
            this.toaster.add({severity:'success', summary:'Success', detail: response.message });
          },
          (error) => {
            this.toaster.add({severity:'error', summary:'Error', detail: error.message });
          }
        )
      },

    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

}
