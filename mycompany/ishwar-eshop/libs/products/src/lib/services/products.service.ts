import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'environment/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProduct = environment.apiUrl + 'products'

  constructor(private http: HttpClient) { }

  // Get Product List
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProduct)
  }

  // Get Product by Id
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProduct}/${productId}`)
  }

  // Create a new Product
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProduct, productData)
  }
  // update existing Product
  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProduct}/${productId}`, productData)
  }

  // delete existing Product
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProduct}/${productId}`)
  }
}