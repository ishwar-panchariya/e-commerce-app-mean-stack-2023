import { Component, Input, OnInit } from '@angular/core';
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
  
  constructor() {}

  ngOnInit() {

  }

}
