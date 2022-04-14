import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDensityOption, IRange } from '../../interfaces';

@Component({
  selector: 'app-density',
  templateUrl: './density.component.html',
  styleUrls: ['./density.component.scss']
})
export class DensityComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Input() densityOptions!: IDensityOption[];
  @Input() densityRange!: IRange;

  selectOptionLocalValue: string | null;
  customOptionLocalValue: string | null;

  constructor() {
    this.selectOptionLocalValue = localStorage.getItem('Selected');
    this.customOptionLocalValue = localStorage.getItem('Custom');
  }

  ngOnInit(): void {
    this.densitySelect?.valueChanges.subscribe(data => {
      
      localStorage.setItem('Density', data.value);
      localStorage.setItem('Selected', data.key);
    })
    if (this.customOptionLocalValue) {
      this.addCustomOption();
      this.updateCustomOptionValue(this.customOptionLocalValue);
    }
    if (this.selectOptionLocalValue) {
      this.updateSelectOptionByKey(this.selectOptionLocalValue);
    }
    else {
      this.setDefaultSelectValue();
    }
  }

  get densitySelect() { return this.parentForm.get('densitySelect'); }
  get densityInput() { return this.parentForm.get('densityInput'); }

  densityInputChange(inputValue: string): void {
    this.updateSelectOptionByValue(inputValue);
  }

  setDefaultSelectValue() {
    this.densitySelect?.patchValue(this.densityOptions[0]);
  }
  updateSelectOptionByValue(value: string): void {
    let option = this.findDensityOptionsBy.value(value, this.densityOptions);

    if (!option) {
      const isCustomOption = this.densityOptions.some(option => option.key == 'Custom');
      if (!isCustomOption) {
        this.addCustomOption();
      }
      this.updateCustomOptionValue(value);
      localStorage.setItem('Custom', value);
      option = this.findDensityOptionsBy.key('Custom', this.densityOptions);
    }
    this.densitySelect?.patchValue(option);
  }
  updateSelectOptionByKey(key: string) {
    let option = this.findDensityOptionsBy.key(key, this.densityOptions);
    this.densitySelect?.patchValue(option);
  }
  findDensityOptionsBy = {
    key: function (key: string | null, options: { key: string, value: string }[]): any {
      return options.find(option => option.key == key);
    },
    value: function (value: string | null, options: { key: string, value: string }[]): any {
      return options.find(option => option.value == value);
    },
  }
  updateCustomOptionValue(value: string) {
    this.densityOptions[this.densityOptions.length - 1].value = value;
  }
  addCustomOption() {
    this.densityOptions.push({ key: 'Custom', value: '', });
  }

}
