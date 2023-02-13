import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@ishwar-eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = []
  orderStatus = ORDER_STATUS
  endSubscription$: Subject<any> = new Subject();

  constructor(
              private ordersService: OrdersService, 
              private router: Router, 
              private confirmationService: ConfirmationService,
              private toaster: MessageService
            ) {}

  ngOnInit() {
    this._getOrders();  
  }

  ngOnDestroy() {
    this.endSubscription$.complete()
  }

  private _getOrders() {
    this.ordersService.getOrders().pipe(takeUntil(this.endSubscription$)).subscribe((res) => {
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
