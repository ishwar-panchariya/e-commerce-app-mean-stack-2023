import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@ishwar-eshop/orders';
import { Product } from '../../models/product.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  
  constructor(private cartService: CartService) {}

  ngOnInit() {

  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }
}
