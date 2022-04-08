import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  densityMin: number = 0.0898;
  densityMax: number = 22.570;
  min: number = 1;
  max: number = 1000;
  densityOptions = [
    { key: 'LDPE Regranulate', value: '0.88', },
    { key: 'LDPE', value: '0.92', },
    { key: 'LLDPE', value: '0.915', },
    { key: 'HDPE', value: '0.941', },
    { key: 'PP', value: '0.946', },
  ];

  constructor(private fb: FormBuilder) {

    this.selectOptionLocalValue = localStorage.getItem('Selected');
    this.customOptionLocalValue = localStorage.getItem('Custom');
  }

  ngOnInit(): void {

    this.calcForm = this.fb.group({
      spoolDiameter: ['10.5', [
        Validators.required,
        Validators.min(this.min),
        Validators.max(this.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")
      ]],
      density: ['', [
        Validators.required,
        Validators.min(this.densityMin),
        Validators.max(this.densityMax),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      weight: ['', [
        Validators.required,
        Validators.min(this.min),
        Validators.max(this.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      rollR: ['', [
        Validators.required,
        Validators.min(this.min),
        Validators.max(this.max),
        Validators.pattern("[0-9]*\.?[0-9]*$")]],
      result: [''],
      selectDensity: ['']
    });

    this.calcForm.valueChanges.subscribe(data => {
      if (this.calcForm.valid) {
        this.calculateResult();
      }
    });

    this.selectDensity?.valueChanges.subscribe(data => {
      this.density?.patchValue(Number(data.value));
      localStorage.setItem('Selected', data.key);
    })

    if (this.customOptionLocalValue) {
      this.AddCustomOption();
      this.updateCustomOptionValue(this.customOptionLocalValue);
    }
    if (this.selectOptionLocalValue) {
      this.updateSelectOptionByKey(this.selectOptionLocalValue);
    }
    else {
      this.setDefaultSelectValue();
    }
  }
  //#region  getters
  get spoolDiameter() { return this.calcForm.get('spoolDiameter'); }
  get density() { return this.calcForm.get('density'); }
  get weight() { return this.calcForm.get('weight'); }
  get rollR() { return this.calcForm.get('rollR'); }
  get result() { return this.calcForm.get('result'); }
  get selectDensity() { return this.calcForm.get('selectDensity'); }
  //#endregion
  onSubmit(form: FormGroup) {
    //console.warn(this.calcForm.value)
    //console.log('Valid?', form.valid); // true or false
    //console.log('Spool Diameter', form.get('spoolDiameter')?.status);
    //console.log('Density', form.get('density'));
    console.log('Weight', form.get('weight')?.errors);
    //console.log('Roll R', form.get('rollR'));
  }
  calculateResult(): void {
    this.spoolRadius = this.spoolDiameter?.value / 2;
    const rollVolume = Math.PI * Math.pow(this.spoolRadius + this.rollR?.value, 2) * this.weight?.value;
    this.spoolVolume = Math.PI * Math.pow(this.spoolRadius, 2) * this.weight?.value;
    const value = ((rollVolume - this.spoolVolume) * this.density?.value) / 1000;
    this.result?.patchValue(value);
  }

  densityInputChange(inputValue: string): void {
    const num: number = Number(inputValue);
    if (inputValue != null && num >= this.densityMin && num <= this.densityMax) {
      
      this.updateSelectOptionByValue(inputValue);
    }
  }

  updateSelectOptionByValue(value: string): void {
    let option = this.findDensityOptionsBy.value(value, this.densityOptions);

    if (!option) {
      const isCustomOption = this.densityOptions.some(option => option.key == 'Custom');
      if (!isCustomOption) {
        this.AddCustomOption();
      }
      this.updateCustomOptionValue(value);
      localStorage.setItem('Custom', value);
      option = this.findDensityOptionsBy.key('Custom', this.densityOptions);
    }
    this.selectDensity?.patchValue(option);
  }

  updateSelectOptionByKey(key: string): void {
    let option = this.findDensityOptionsBy.key(key, this.densityOptions);
    this.selectDensity?.patchValue(option);
  }

  findDensityOptionsBy = {
    key: function (key: string | null, options: { key: string, value: string}[]): any {
      return options.find(option => option.key == key);
    },
    value: function (value: string | null, options: { key: string, value: string}[]): any {
      return options.find(option => option.value == value);
    },
  }

  setDefaultSelectValue(): void {
    this.selectDensity?.patchValue(this.densityOptions[0]);
  }

  AddCustomOption(): void {
    this.densityOptions.push({ key: 'Custom', value: '', });
  }

  updateCustomOptionValue(value: any): void {
    this.densityOptions[this.densityOptions.length - 1].value = value;
  }
}

