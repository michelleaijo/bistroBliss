import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class CarouselDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTopMeals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topMeals`);
  }

  getRecommendedMeals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recommendedMeals`);
  }

  getFavoriteRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favoriteRestaurants`);
  }

  editMeal(mealId: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/topMeals/${mealId}`, updatedData);
  }

  editRecommendedMeal(mealId: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/recommendedMeals/${mealId}`, updatedData);
  }
  
  editFavoriteRestaurant(restaurantId: string, updatedData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/favoriteRestaurants/${restaurantId}`, updatedData);
  } 

  addMeal(meal: Product): Observable<Product> {
    const endpoint = meal.category === 'top' ? 'topMeals' : 'recommendedMeals';
    return this.http.post<Product>(`${this.apiUrl}/${endpoint}`, meal);
  }
}
