import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit, OnDestroy{

  products: Product[] = []
  categories: Category[] = []
  endSubs$: Subject<any> = new Subject();
  selectedCategories: string[] = [];
  isCategoryPage!: boolean;

  constructor(private productService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      params['categoryid'] ? this._getProductList([params['categoryid']]) : this._getProductList();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false)
    })
      
      this._getCategoryList()
  }

  private _getProductList(categoryFilter?: string[]) {
    this.productService.getProducts(categoryFilter).pipe(takeUntil(this.endSubs$)).subscribe(resProducts => {
      this.products = resProducts;
    })
  }

  private _getCategoryList() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(resCategories => {
      this.categories = resCategories;
    })
  }

  categoryFilter(id: any) {
    const existedCategories = this.selectedCategories.findIndex(x => x == id)
    if(existedCategories != -1) {
      this.selectedCategories.splice(existedCategories, 1)
    } 
    else {
      this.selectedCategories.push(id)
    }
    this._getProductList(this.selectedCategories)
  }

  ngOnDestroy(): void {
    this.endSubs$.complete()
  }
}
