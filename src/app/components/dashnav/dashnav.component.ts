import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CarouselDataService } from '../../services/carouselData/carousel-data.service';
import { CartService } from 'src/app/services/cartData/cart-data.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashnav',
  templateUrl: './dashnav.component.html',
  styleUrls: ['./dashnav.component.css']
})
export class DashnavComponent implements OnInit {

  allMeals: any[] = [];
  searchResults: any[] = [];
  settingsOpen: boolean = false;
  searchQuery: string = '';
  
  @Input() cartCount: number = 0;
  @Output() viewOrdersClick = new EventEmitter<void>();

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private carouselDataService: CarouselDataService
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    forkJoin([
      this.carouselDataService.getTopMeals(),
      this.carouselDataService.getRecommendedMeals()
    ]).subscribe(([topMeals, recommendedMeals]) => {
      this.allMeals = [...topMeals, ...recommendedMeals];
    });    
  }

  onViewOrdersClick(): void {
    this.viewOrdersClick.emit();
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.allMeals.filter(meal =>
      meal.name.toLowerCase().includes(query) ||
      meal.description?.toLowerCase().includes(query)
    );
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  @HostListener('document:click', ['$event'])
  closeSettings(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.settings-panel') && !target.closest('.settings-toggle')) {
      this.settingsOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
