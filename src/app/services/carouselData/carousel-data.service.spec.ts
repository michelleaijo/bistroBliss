import { TestBed } from '@angular/core/testing';

import { CarouselDataService } from './carousel-data.service';

describe('CarouselDataService', () => {
  let service: CarouselDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
