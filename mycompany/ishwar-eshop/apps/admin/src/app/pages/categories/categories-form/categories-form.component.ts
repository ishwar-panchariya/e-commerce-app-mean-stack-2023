import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@ishwar-eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form! : FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategorId: string;

  constructor(private _fb: FormBuilder, 
              private _categoryService: CategoriesService, 
              private _toaster: MessageService,
              private _location: Location,
              private _route: ActivatedRoute) {}

  ngOnInit(): void {
    
    // initialize the form
    this.form = this._fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#000']
    })

    // check edit mode
    this._checkEditMode()
  }

  // edit mode function
  private _checkEditMode() {
    this._route.params.subscribe(params => {
      if(params.id) {
        this.editMode = true
        this.currentCategorId = params.id
        this._categoryService.getCategory(params.id).subscribe(category => {
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['icon'].setValue(category.icon);
          this.categoryForm['color'].setValue(category.color);
        })
      }
    })
  }

  // form controls getter
  get categoryForm() {
    return this.form.controls
  }

  // Save Category
  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return
    }

    const category: Category = {
      id: this.currentCategorId,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    }

    if(this.editMode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }
  }

  private _addCategory(category: Category) {
    this._categoryService.createCategory(category).subscribe(
      (response: Category) => {
        this._toaster.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`Category ${response.name} is created!`
          }
        );
        timer(2000).toPromise().then(() => {
          this._location.back()
        })
      },
      (error) => {
        this._toaster.add({severity:'error', summary:'Error', detail: error});
    })
  }

  private _updateCategory(category: Category) {
    this._categoryService.updateCategory(category).subscribe(
      (response: Category) => {
        this._toaster.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`Category ${response.name} is updated!`
          }
        );
        timer(2000).toPromise().then(() => {
          this._location.back()
        })
      },
      (error) => {
        this._toaster.add({severity:'error', summary:'Error', detail: error});
    })
  }

  

}
