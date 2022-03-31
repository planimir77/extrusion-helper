import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollWeightComponent } from './roll-weight.component';

describe('RollWeightComponent', () => {
  let component: RollWeightComponent;
  let fixture: ComponentFixture<RollWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
