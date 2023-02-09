import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@ishwar-eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  form! : FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  categories = [];
  imageDisplay: string | ArrayBuffer;

  constructor(private fb: FormBuilder, 
              private productService: ProductsService,
              private categoryService: CategoriesService,
              private toaster: MessageService,
              private location: Location,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._initForm()
    this._getCategoryList()

    // check edit mode
    this._checkEditMode()
  }
  
  private _initForm() {
    // initialize the form
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })    
  }

  // get category list for dropdown
  private _getCategoryList() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res
    })
  }


  // edit mode function
  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.editMode = true
        this.currentProductId = params.id
        this.productService.getProduct(this.currentProductId).subscribe(product => {
          this.productForm['name'].setValue(product.name);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['category'].setValue(product.category.id);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
        })
      }
    })
  }

  // form controls getter
  get productForm() {
    return this.form.controls
  }

  // image upload
  onImageUpload(event) {
    const file = event.target.files[0]

    if(file) {
      this.form.patchValue({ image: file})
      this.form.get('image').updateValueAndValidity()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }

      fileReader.readAsDataURL(file)
    }
  }
  
  
  // Save Product
  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) return;

    const productData = new FormData()

    Object.keys(this.productForm).map(key => {
      productData.append(key, this.productForm[key].value)
    })
    if(this.editMode) {
      this._updateProduct(productData)
    } else {
      this._addProduct(productData)
    }
  }

  private _addProduct(productData: FormData) {
    this.productService.createProduct(productData).subscribe(
      (response: Product) => {
        this.toaster.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`Product ${response.name} is created!`
          }
        );
        timer(2000).toPromise().then(() => {
          this.location.back()
        })
      },
      (error) => {
        this.toaster.add({severity:'error', summary:'Error', detail: error});
    })
  }

  private _updateProduct(productData: FormData) {
    this.productService.updateProduct(productData, this.currentProductId).subscribe(
      (response: Product) => {
        this.toaster.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`Product ${response.name} is updated!`
          }
        );
        timer(2000).toPromise().then(() => {
          this.location.back()
        })
      },
      (error) => {
        this.toaster.add({severity:'error', summary:'Error', detail: error});
    })
  }

  // back button 
  goBack() {
    this.location.back()
  }


}
