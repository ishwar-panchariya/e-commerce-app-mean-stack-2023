import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { map, Observable } from 'rxjs';
import { environment } from 'environment/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProduct = environment.apiUrl + 'products'

  constructor(private http: HttpClient) { }

  // Get Product List
  getProducts(categoryFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams()

    if(categoryFilter){
      params = params.append('categories', categoryFilter.join(','))
    }
    return this.http.get<Product[]>(this.apiURLProduct, { params: params})
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

  // Get products count
  getProductCount(): Observable<{ productCount: number }> {
    return this.http.get<{ productCount: number }>(`${this.apiURLProduct}/get/count`).pipe()
  }

  // Get featured products
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProduct}/get/featured/${count}`)
  }
  
}
