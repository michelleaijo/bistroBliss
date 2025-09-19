import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashnavComponent } from './dashnav.component';

describe('DashnavComponent', () => {
  let component: DashnavComponent;
  let fixture: ComponentFixture<DashnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
