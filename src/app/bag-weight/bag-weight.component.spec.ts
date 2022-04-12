import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagWeightComponent } from './bag-weight.component';

describe('BagWeightComponent', () => {
  let component: BagWeightComponent;
  let fixture: ComponentFixture<BagWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BagWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
