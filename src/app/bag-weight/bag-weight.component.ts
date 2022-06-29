import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IDensityOption, IRange } from '../shared/interfaces';
import { DensityOptionsService } from '../shared/services/density-options.service';

@Component({
  selector: 'app-bag-weight',
  templateUrl: './bag-weight.component.html',
  styleUrls: ['./bag-weight.component.scss']
})
export class BagWeightComponent implements OnInit {

  calcForm!: FormGroup;
  @ViewChild('weightUnit') weightUnit: any;
  @ViewChild('quantityUnit') quantityUnit: any;

  pcs: string = 'pcs.';
  piece: string = 'piece';

  spoolVolume!: number;
  spoolRadius!: number;

  selectOptionLocalValue!: string | null;
  customOptionLocalValue!: string | null;

  densityRange!: IRange;
  defaultRange!: IRange;
  thicknessRange!: IRange;
  quantityRange!: IRange;

  densityOptions: IDensityOption[];

  constructor(private fb: FormBuilder, service: DensityOptionsService) {

    this.densityOptions = service.getOptions();
    this.selectOptionLocalValue = localStorage.getItem('Selected');
    this.customOptionLocalValue = localStorage.getItem('Custom');
    this.densityRange = { min: 0.0898, max: 22.570 };
    this.defaultRange = { min: 1, max: 1000 };
    this.thicknessRange = { min: 1, max: 2000 };
    this.quantityRange = { min: 1, max: 10000000 };
  }

  ngOnInit(): void {
    this.calcForm = this.fb.group({

      densitySelect: [''],
      densityInput: ['', [
        Validators.required,
        Validators.min(this.densityRange.min),
        Validators.max(this.densityRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      width: ['', [
        Validators.required,
        Validators.min(this.defaultRange.min),
        Validators.max(this.defaultRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      length: ['', [
        Validators.required,
        Validators.min(this.defaultRange.min),
        Validators.max(this.defaultRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      thickness: ['', [
        Validators.required,
        Validators.min(this.thicknessRange.min),
        Validators.max(this.thicknessRange.max),
        Validators.pattern("[1-9][0-9]*$")]],
      quantity: ['1', [
        Validators.required,
        Validators.min(this.quantityRange.min),
        Validators.max(this.quantityRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      weight: [''],
    });
    this.calcForm
      .valueChanges
      .pipe(debounceTime(400))
      .subscribe(() => {
        if (this.calcForm.valid) {
          this.refreshWeight();
        }
      });
    this.quantity
      ?.valueChanges
      .subscribe(value => {
        this.quantityUnit.nativeElement.innerText = value == "1" ? this.piece : this.pcs;
      });

    if (localStorage.getItem('Density')) {
      this.densityInput?.patchValue(Number(localStorage.getItem('Density')));
    }
    else {
      this.setDefaultDensityValue();
    }
  }
  setDefaultDensityValue() {
    this.densityInput?.patchValue(Number(this.densityOptions[0].value));
  }
  refreshWeight() {
    const weight = this.calculateWeight();
    this.weightUnit.nativeElement.innerText = weight.unit;
    this.weight?.patchValue(weight.value, { emitEvent: false });
  }

  //#region  getters
  get densitySelect() { return this.calcForm.get('densitySelect'); }
  get densityInput() { return this.calcForm.get('densityInput'); }
  get width() { return this.calcForm.get('width'); }
  get length() { return this.calcForm.get('length'); }
  get thickness() { return this.calcForm.get('thickness'); }
  get quantity() { return this.calcForm.get('quantity'); }
  get weight() { return this.calcForm.get('weight'); }
  //#endregion

  calculateWeight(): { unit: string; value: number } {
    const widthInCm: number = this.width?.value / 100;
    const lengthInCm: number = this.length?.value / 100;
    const thickness: number = this.thickness?.value;
    const density: number = this.densityInput?.value;
    const quantity: number = this.quantity?.value;
    let value = widthInCm * lengthInCm * density * thickness * 2 * quantity;
    const unit = value >= 1000 ? 'kg' : 'gr';
    value = value >= 1000 ? value / 1000 : value;
    return { unit, value };
  }
}

