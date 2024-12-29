import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDensityOption, IRange } from '../shared/interfaces';
import { DensityOptionsService } from '../shared/services/density-options.service';

@Component({
  selector: 'app-roll-weight',
  templateUrl: './roll-weight.component.html',
  styleUrls: ['./roll-weight.component.scss'],
  providers: [DensityOptionsService],
})
export class RollWeightComponent implements OnInit {
  calcForm!: FormGroup;

  spoolVolume!: number;
  spoolRadius!: number;

  selectOptionLocalValue: string | null;
  customOptionLocalValue: string | null;

  densityRange!: IRange;
  defaultRange!: IRange;

  densityOptions: IDensityOption[];

  widthValue: number;

  constructor(private fb: FormBuilder, service: DensityOptionsService) {
    this.densityOptions = service.getOptions();
    this.selectOptionLocalValue = localStorage.getItem('Selected-Roll-Density');
    this.customOptionLocalValue = localStorage.getItem('Custom-Roll-Density');
    this.densityRange = { min: 0.0898, max: 22.57 };
    this.defaultRange = { min: 0.1, max: 1000 };
    this.widthValue = 80;
  }

  ngOnInit(): void {
    this.calcForm = this.fb.group({
      spoolDiameter: [
        10.5,
        [
          Validators.required,
          Validators.min(this.defaultRange.min),
          Validators.max(this.defaultRange.max),
          Validators.pattern('[0-9]*.?[0-9]*$'),
        ],
      ],
      densityInput: [
        '',
        [
          Validators.required,
          Validators.min(this.densityRange.min),
          Validators.max(this.densityRange.max),
          Validators.pattern('[0-9]*.?[0-9]*$'),
        ],
      ],
      width: [
        '',
        [
          Validators.required,
          Validators.min(this.defaultRange.min),
          Validators.max(this.defaultRange.max),
          Validators.pattern(
            /^([0-9]*\.?\,?[0-9]|[0-9]*\.?[0-9]\+[0-9]|[0-9]*\.?[0-9]\+[0-9]\*[0-9]*\.?[0-9])$/
          ),
          //Validators.pattern("[0-9]*\.?[0-9]*$")
        ],
      ],
      rollR: [
        '',
        [
          Validators.min(this.defaultRange.min),
          Validators.max(this.defaultRange.max),
          Validators.pattern('[0-9]*.?[0-9]*$'),
        ],
      ],
      result: [
        '',
        [
          Validators.min(this.defaultRange.min),
          Validators.max(this.defaultRange.max),
          Validators.pattern('[0-9]*.?[0-9]*$'),
        ],
      ],
      densitySelect: [''],
    });

    if (localStorage.getItem('Roll-Density')) {
      this.densityInput?.patchValue(
        Number(localStorage.getItem('Roll-Density'))
      );
    } else {
      this.setDefaultDensityValue();
    }
  }
  //#region  getters
  get spoolDiameter() {
    return this.calcForm.get('spoolDiameter');
  }
  get densityInput() {
    return this.calcForm.get('densityInput');
  }
  get width() {
    return this.calcForm.get('width');
  }
  get rollR() {
    return this.calcForm.get('rollR');
  }
  get result() {
    return this.calcForm.get('result');
  }
  get densitySelect() {
    return this.calcForm.get('densitySelect');
  }
  //#endregion
  onSubmit(form: FormGroup) {
    //throw new Error('Not implemented.');
  }
  calculateResult(): void {
    const calculatedWidth = this.calculateWidth();
    if (!Number.isNaN(calculatedWidth)) {
      this.spoolRadius = this.spoolDiameter?.value / 2;
      this.spoolVolume =
        Math.PI * Math.pow(this.spoolRadius, 2) * calculatedWidth;

      // Calculate result
      if (this.rollR?.value) {
        const rollVolume =
          Math.PI *
          Math.pow(this.spoolRadius + this.rollR?.value, 2) *
          calculatedWidth;
        const densityInput: any = this.densityInput?.value;
        const value = ((rollVolume - this.spoolVolume) * densityInput) / 1000;

        this.result?.patchValue(Number(value.toFixed(3)), { emitEvent: false });
      } else if (!this.rollR?.value) {
        this.result?.patchValue('', { emitEvent: false });
      }
    }
  }
  calculateRollR(): void {
    const calculatedWidth = this.calculateWidth();
    if (!Number.isNaN(calculatedWidth)) {
      this.spoolRadius = this.spoolDiameter?.value / 2;
      this.spoolVolume =
        Math.PI * Math.pow(this.spoolRadius, 2) * calculatedWidth;

      if (this.result?.value) {
        const value =
          Math.sqrt(
            ((this.result?.value * 1000) / this.densityInput?.value +
              this.spoolVolume) /
              calculatedWidth /
              Math.PI
          ) - this.spoolRadius;
        this.rollR?.patchValue(Number(value.toFixed(2)), { emitEvent: false });
      } else {
        this.rollR?.patchValue('', { emitEvent: false });
      }
    }
  }
  calculateWidth(): number {
    const arr = this.width?.value
      .split('+')
      .filter((item: string) => item != '');
    if (arr.length === 1) {
      return Number(arr[0]);
    } else if (arr.length === 2) {
      const secondExpression = arr[1]
        .split('*')
        .filter((item: string) => item != '');
      return secondExpression.length === 1
        ? (Number(arr[0]) + Number(secondExpression[0])) / 2
        : (Number(arr[0]) +
            Number(secondExpression[0]) * Number(secondExpression[1])) /
            2;
    }
    return NaN;
  }
  setDefaultDensityValue() {
    this.densityInput?.patchValue(Number(this.densityOptions[0].value));
  }
  onKeyUp(event: any) {
    if (
      event.currentTarget.id == 'width' &&
      (this.rollR?.value != '' || this.result?.value != '')
    ) {
      if (this.rollR?.value == '') {
        // ('Calculate rollR');
        this.calculateRollR();
      } else {
        // ('Calculate result');
        this.calculateResult();
      }
    } else if (
      event.currentTarget.id == 'rollR' &&
      (this.width?.value != '' || this.result?.value != '')
    ) {
      if (this.width?.value == '') {
        // Patch zero to width
        this.width?.patchValue(0, { emitEvent: false });
      } else {
        // ('Calculate result');
        this.calculateResult();
      }
    } else if (
      event.currentTarget.id == 'result' &&
      (this.width?.value != '' || this.rollR?.value != '')
    ) {
      if (this.width?.value != '') {
        // ('Calculate rollR');
        this.calculateRollR();
      } else {
        // Patch zero to width
        this.width?.patchValue(0, { emitEvent: false });
      }
    } else if (
      event.currentTarget.id == 'spoolDiameter' && this.spoolDiameter?.value &&
      (this.width?.value || this.rollR?.value)
    ) {
      this.calculateResult();
    }
  }
}
