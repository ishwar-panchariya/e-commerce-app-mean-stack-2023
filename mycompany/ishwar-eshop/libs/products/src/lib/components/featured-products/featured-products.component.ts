import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = []
  count = 4;
  endSub$: Subject<any> = new Subject()

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts() {
    this.productService.getFeaturedProducts(this.count).pipe(takeUntil(this.endSub$)).subscribe(products => {
      this.featuredProducts = products
    })
  }

  ngOnDestroy(): void {
    this.endSub$.complete()
  }
}
