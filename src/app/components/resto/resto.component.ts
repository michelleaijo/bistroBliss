import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselDataService } from 'src/app/services/carouselData/carousel-data.service';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.css']
})
export class RestaurantComponent implements OnInit, OnChanges {
  
  @Input() restaurant!: Product | null;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Product>();

  editMode = false;
  editedRestaurant: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: CarouselDataService
  ) {}

  ngOnInit(): void {
    if (!this.restaurant) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.dataService.getFavoriteRestaurants().subscribe(restaurants => {
          const found = restaurants.find(r => r.id === id);
          if (found) this.restaurant = found;
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant'] && this.restaurant) {
      this.editMode = false;
      this.editedRestaurant = { ...this.restaurant };
    }
  }

  onClose(): void {
    this.close.emit();
  }

  enableEdit(): void {
    if (this.restaurant) {
      this.editMode = true;
      this.editedRestaurant = { ...this.restaurant };
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editedRestaurant = this.restaurant ? { ...this.restaurant } : null;
  }

  saveChanges(): void {
    if (!this.editedRestaurant) return;

    this.dataService.editFavoriteRestaurant(this.editedRestaurant.id, this.editedRestaurant)
      .subscribe({
        next: updated => {
          this.editMode = false;
          this.restaurant = updated;
          this.editedRestaurant = { ...updated };
          this.updated.emit(updated);
          alert('Restaurant updated successfully!');
        },
        error: err => {
          alert('Failed to update restaurant');
          console.error(err);
        }
      });
  }
}
