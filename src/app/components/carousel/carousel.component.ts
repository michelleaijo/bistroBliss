import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() showCartIcons: boolean = true;

  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() showDescriptionEvent = new EventEmitter<Product>();
  @Output() mealUpdated = new EventEmitter<Product>();
  @Output() editEvent = new EventEmitter<Product>();

  displayEditDialog = false;
  selectedProduct: Product | null = null;
  editForm!: FormGroup;

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
  ];

  ngOnInit(): void {}

  showDescription(product: Product): void {
    this.showDescriptionEvent.emit(product);
  }

  editItem(product: Product): void {
    this.selectedProduct = { ...product };
    this.editForm = new FormGroup({
      name: new FormControl(this.selectedProduct.name, Validators.required),
      description: new FormControl(this.selectedProduct.description, Validators.required),
      price: new FormControl(this.selectedProduct.price, [Validators.required, Validators.min(0)]),
      image: new FormControl(this.selectedProduct.image, Validators.required),
    });
    this.displayEditDialog = true;
  }

  saveEditedMeal(): void {
    if (this.editForm.invalid || !this.selectedProduct) return;

    const updatedProduct = {
      ...this.selectedProduct,
      ...this.editForm.value,
    };

    this.mealUpdated.emit(updatedProduct);
    this.displayEditDialog = false;
  }

  cancelEdit(): void {
    this.displayEditDialog = false;
    this.selectedProduct = null;
  }
}