import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@ishwar-eshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = []
  endSubscription$: Subject<any> = new Subject();

  constructor(private productService: ProductsService,
              private toaster: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {}

  ngOnInit() {
    this._getProductList();  
  }

  ngOnDestroy() {
    this.endSubscription$.complete()
  }

  private _getProductList() {
    this.productService.getProducts().pipe(takeUntil(this.endSubscription$)).subscribe((res) => {
      this.products = res
    })
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(
          (response) => {
            this._getProductList()
            this.toaster.add({severity:'success', summary:'Success', detail: response.message });
          },
          (error) => {
            this.toaster.add({severity:'error', summary:'Error', detail: error.message });
          }
        )
      },

    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }

}
