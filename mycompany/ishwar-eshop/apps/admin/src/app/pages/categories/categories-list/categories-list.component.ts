import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@ishwar-eshop/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = []
  endSubscription$: Subject<any> = new Subject();

  constructor(private _categoryService: CategoriesService,
              private _toaster: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {}

  ngOnInit() {
    this._getCategoryList();  
  }

  ngOnDestroy() {
    this.endSubscription$.complete()
  }

  private _getCategoryList() {
    this._categoryService.getCategories().pipe(takeUntil(this.endSubscription$)).subscribe((res) => {
      this.categories = res
    })
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._categoryService.deleteCategory(categoryId).subscribe(
          (response) => {
            this._getCategoryList()
            this._toaster.add({severity:'success', summary:'Success', detail: response.message });
          },
          (error) => {
            this._toaster.add({severity:'error', summary:'Error', detail: error.message });
          }
        )
      },

    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }
}
