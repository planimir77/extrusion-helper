import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDensityOption, IRange } from '../shared/interfaces';

@Component({
  selector: 'app-roll-weight',
  templateUrl: './roll-weight.component.html',
  styleUrls: ['./roll-weight.component.scss']
})
export class RollWeightComponent implements OnInit {

  calcForm!: FormGroup;

  spoolVolume!: number;
  spoolRadius!: number;

  selectOptionLocalValue: string | null;
  customOptionLocalValue: string | null;

  densityRange!: IRange;
  defaultRange!: IRange;

  densityOptions: IDensityOption[] = [
    { key: 'LDPE Regranulate', value: '0.88', },
    { key: 'LDPE', value: '0.92', },
    { key: 'LLDPE', value: '0.915', },
    { key: 'HDPE', value: '0.941', },
    { key: 'PP', value: '0.946', },
  ];

  constructor(private fb: FormBuilder) {

    this.selectOptionLocalValue = localStorage.getItem('Selected');
    this.customOptionLocalValue = localStorage.getItem('Custom');
    this.densityRange = { min: 0.0898, max: 22.570 };
    this.defaultRange = { min: 1, max: 1000 };
  }

  ngOnInit(): void {

    this.calcForm = this.fb.group({
      spoolDiameter: ['10.5', [
        Validators.required,
        Validators.min(this.defaultRange.min),
        Validators.max(this.defaultRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")
      ]],
      densityInput: ['', [
        Validators.required,
        Validators.min(this.densityRange.min),
        Validators.max(this.densityRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      weight: ['', [
        Validators.required,
        Validators.min(this.defaultRange.min),
        Validators.max(this.defaultRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      rollR: ['', [
        Validators.required,
        Validators.min(this.defaultRange.min),
        Validators.max(this.defaultRange.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      result: [''],
      selectDensity: ['']
    });

    this.calcForm.valueChanges.subscribe(data => {
      if (this.calcForm.valid) {
        this.calculateResult();
      }
    });

    if (localStorage.getItem('Density')) {
      this.densityInput?.patchValue(Number(localStorage.getItem('Density')));
    }
    else {
      this.setDefaultDensityValue();
    }
  }
  //#region  getters
  get spoolDiameter() { return this.calcForm.get('spoolDiameter'); }
  get densityInput() { return this.calcForm.get('densityInput'); }
  get weight() { return this.calcForm.get('weight'); }
  get rollR() { return this.calcForm.get('rollR'); }
  get result() { return this.calcForm.get('result'); }
  get selectDensity() { return this.calcForm.get('selectDensity'); }
  //#endregion
  onSubmit(form: FormGroup) {
    throw new Error('Not implemented.');
  }
  calculateResult(): void {
    this.spoolRadius = this.spoolDiameter?.value / 2;
    const rollVolume = Math.PI * Math.pow(this.spoolRadius + this.rollR?.value, 2) * this.weight?.value;
    this.spoolVolume = Math.PI * Math.pow(this.spoolRadius, 2) * this.weight?.value;
    const value = ((rollVolume - this.spoolVolume) * this.densityInput?.value) / 1000;
    this.result?.patchValue(value, { emitEvent: false });
  }
  setDefaultDensityValue() {
    this.densityInput?.patchValue(Number(this.densityOptions[0].value))
  }
}
