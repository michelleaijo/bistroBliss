import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoComponent } from './resto.component';

describe('RestoComponent', () => {
  let component: RestoComponent;
  let fixture: ComponentFixture<RestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
