import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@ishwar-eshop/orders';
import { ProductsService } from '@ishwar-eshop/products';
import { UsersService } from '@ishwar-eshop/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  counts = []
  endSubscription$: Subject<any> = new Subject();

  constructor(private orderService: OrdersService, private productService: ProductsService, private userService: UsersService) {}

  ngOnInit(): void {
      combineLatest(
        this.orderService.getOrderCount(),
        this.productService.getProductCount(),
        this.userService.getUserCount(),
        this.orderService.getTotalSalesCount()
      ).pipe(takeUntil(this.endSubscription$)).subscribe(values => {
        this.counts = values
      })
  }

  ngOnDestroy() {
    this.endSubscription$.complete()
  }
}
