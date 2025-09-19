import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];
  private userId = '';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartCountSubject = new BehaviorSubject(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.cart = user.cart || [];
      this.emitCartChanges();
    }
  }

  private emitCartChanges(): void {
    this.cartCountSubject.next(this.cart.reduce((sum, i) => sum + i.quantity, 0));
    this.cartItemsSubject.next([...this.cart]);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getTotalQuantity(): number {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  addToCart(productId: string, name: string): Observable<void> {
    if (!this.userId) {
      console.warn('No user ID – cannot add to cart.');
      return of(void 0);
    }
    const item = this.cart.find(i => i.productId === productId);
    item ? item.quantity++ : this.cart.push({ productId, name, quantity: 1 });
    this.updateLocalCart();
    return this.syncCartWithServer();
  }

  updateCart(cart: CartItem[]): void {
    this.cart = [...cart];
    this.updateLocalCart();
    this.userId && this.syncCartWithServer().subscribe(() => console.log('Cart updated'));
  }

  editCartItem(productId: string, updatedData: Partial<CartItem>): Observable<void> {
    const index = this.cart.findIndex(i => i.productId === productId);
    if (index === -1) return of(void 0);
    this.cart[index] = { ...this.cart[index], ...updatedData };
    this.updateLocalCart();
    return this.userId ? this.syncCartWithServer('Cart item edited in DB') : of(void 0);
  }

  private updateLocalCart(): void {
    this.emitCartChanges();
    const user = this.authService.getCurrentUser();
    if (user) user.cart = [...this.cart];
  }

  private syncCartWithServer(logMessage?: string): Observable<void> {
    return this.authService.updateUserCart(this.userId, this.cart).pipe(
      tap(() => logMessage && console.log(logMessage || 'Cart updated in DB'))
    );
  }
}
