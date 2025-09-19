import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CarouselDataService } from '../../services/carouselData/carousel-data.service';
import { CartService } from 'src/app/services/cartData/cart-data.service';
import { Product } from '../../models/product.models';

interface User {
  id: string;
  fullName: string;
  cart: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  cartCount: number = 0;
  topMeals: Product[] = [];
  recommendedMeals: Product[] = [];
  favoriteRestaurants: Product[] = [];
  showOrders = false;
  selectedRestaurant: Product | null = null;
  showAddMealDialog = false;
  newMeal: Partial<Product> = {};
  addMealType: 'topMeals' | 'recommendedMeals' = 'topMeals';

  constructor(
    private router: Router,
    private authService: AuthService,
    private carouselService: CarouselDataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.cartCount = this.user?.cart?.length || 0;
    this.fetchCarouselData();
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, product.name).subscribe(() => {
      console.log('Added to cart:', product.name);
    });
  }

  fetchCarouselData(): void {
    this.carouselService.getTopMeals().subscribe(data => this.topMeals = data);
    this.carouselService.getRecommendedMeals().subscribe(data => this.recommendedMeals = data);
    this.carouselService.getFavoriteRestaurants().subscribe(data => this.favoriteRestaurants = data);
  }

  onShowDescription(product: Product): void {
    this.selectedRestaurant = product;
    this.showOrders = false;
  }

  closePanels(): void {
    this.showOrders = false;
    this.selectedRestaurant = null;
  }

  toggleOrders(): void {
    this.showOrders = !this.showOrders;
    if (this.showOrders) this.selectedRestaurant = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onRestaurantUpdated(updated: Product): void {
    const idx = this.favoriteRestaurants.findIndex(r => r.id === updated.id);
    if (idx !== -1) {
      this.favoriteRestaurants[idx] = updated;
    }
    this.selectedRestaurant = updated;
  }

  openEditRestaurant(product: Product): void {
    this.selectedRestaurant = product;
    this.showOrders = false;
  }

  onMealUpdated(updatedMeal: Product, type: 'topMeals' | 'recommendedMeals'): void {
    let updateObservable;
    if (type === 'topMeals') {
      updateObservable = this.carouselService.editMeal(updatedMeal.id, updatedMeal);
    } else if (type === 'recommendedMeals') {
      updateObservable = this.carouselService.editRecommendedMeal(updatedMeal.id, updatedMeal);
    }

    if (updateObservable) {
      updateObservable.subscribe({
        next: (result) => {
          const list = type === 'topMeals' ? this.topMeals : this.recommendedMeals;
          const index = list.findIndex(p => p.id === result.id);
          if (index !== -1) {
            list[index] = result;
          }
          alert('Meal updated successfully!');
        },
        error: (err) => {
          console.error('Failed to update meal:', err);
          alert('Failed to update meal.');
        }
      });
    }
  }

  openAddMealDialog(type: 'topMeals' | 'recommendedMeals'): void {
    this.addMealType = type;
    this.showAddMealDialog = true;
    this.newMeal = {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: type === 'topMeals' ? 'top' : 'recommended'
    };
  }

  closeAddMealDialog(): void {
    this.showAddMealDialog = false;
  }

  submitAddMeal(): void {
    if (!this.newMeal.name || !this.newMeal.description || this.newMeal.price === undefined) {
      alert('Please fill all required fields.');
      return;
    }

    const mealToAdd: Product = {
      id: '',
      name: this.newMeal.name!,
      description: this.newMeal.description!,
      price: this.newMeal.price!,
      image: this.newMeal.image || 'https://via.placeholder.com/150',
      quantity: 0,
      inventoryStatus: 'INSTOCK',
      rating: 0,
      category: this.newMeal.category || (this.addMealType === 'topMeals' ? 'top' : 'recommended')
    };

    this.carouselService.addMeal(mealToAdd).subscribe({
      next: (addedMeal) => {
        if (this.addMealType === 'topMeals') {
          this.topMeals = [...this.topMeals, addedMeal];
        } else {
          this.recommendedMeals = [...this.recommendedMeals, addedMeal];
        }
        alert('Meal added successfully!');
        this.closeAddMealDialog();
      },
      error: (err) => {
        console.error('Error adding meal:', err);
        alert('Failed to add meal.');
      }
    });
  }
}