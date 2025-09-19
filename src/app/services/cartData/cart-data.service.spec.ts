import { TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/services/cartData/cart-data.service';


describe('CartDataService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
