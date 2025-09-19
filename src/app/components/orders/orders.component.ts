import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartData/cart-data.service';
import { Product } from 'src/app/models/product.models';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, product.name).subscribe(() => {
      console.log('Item added');
    });
  }

  increaseQuantity(item: CartItem): void {
    const index = this.cartItems.findIndex(i => i.productId === item.productId);
    if (index !== -1) {
      const updatedItem = {
        ...this.cartItems[index],
        quantity: this.cartItems[index].quantity + 1
      };
      this.cartItems = [
        ...this.cartItems.slice(0, index),
        updatedItem,
        ...this.cartItems.slice(index + 1)
      ];
      this.updateCart();
    }
  }

  decreaseQuantity(item: CartItem): void {
    const index = this.cartItems.findIndex(i => i.productId === item.productId);
    if (index === -1) return;

    if (this.cartItems[index].quantity > 1) {
      const updatedItem = {
        ...this.cartItems[index],
        quantity: this.cartItems[index].quantity - 1
      };
      this.cartItems = [
        ...this.cartItems.slice(0, index),
        updatedItem,
        ...this.cartItems.slice(index + 1)
      ];
    } else {
      this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
    }
    this.updateCart();
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
    this.updateCart();
  }

  private updateCart(): void {
    this.cartService.updateCart(this.cartItems);
  }
}
