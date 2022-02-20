import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreVisitComponent } from './store-visit.component';

describe('StoreVisitComponent', () => {
  let component: StoreVisitComponent;
  let fixture: ComponentFixture<StoreVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
