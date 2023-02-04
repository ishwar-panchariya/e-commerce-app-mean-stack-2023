import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategory = environment.apiUrl + 'categories'

  constructor(private http: HttpClient) { }

  // Get Category List
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategory)
  }

  // Get Category by Id
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategory}/${categoryId}`)
  }

  // Create a new category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategory, category)
  }

  // update existing category
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategory}/${category.id}`, category)
  }

  // delete existing category
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategory}/${categoryId}`)
  }
}
