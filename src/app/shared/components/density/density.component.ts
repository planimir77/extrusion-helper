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
    this.selectOptionLocalValue = "";
    this.customOptionLocalValue = ""
  }

  ngOnInit(): void {

    this.densitySelect?.valueChanges.subscribe(data => {
      this.densityInput?.patchValue(Number(data.value));
      this.isBagForm() ? this.setLocalStorigeBagItems(data) : this.setLocalStorigeRollItems(data);
    })
    this.isBagForm() ? this.getLocalStorigeBagItems() : this.getLocalStorigeRollItems();
    const lastOption = this.densityOptions[this.densityOptions.length - 1].key;
    if (lastOption != 'Custom' && this.customOptionLocalValue) {
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
  getLocalStorigeBagItems() {
    this.selectOptionLocalValue = localStorage.getItem('Bag-Selected');
    this.customOptionLocalValue = localStorage.getItem('Bag-Custom');
  }
  getLocalStorigeRollItems() {
    this.selectOptionLocalValue = localStorage.getItem('Roll-Selected');
    this.customOptionLocalValue = localStorage.getItem('Roll-Custom');
  }

  get densitySelect() { return this.parentForm.get('densitySelect'); }
  get densityInput() { return this.parentForm.get('densityInput'); }

  densityInputChange(inputValue: string): void {
    this.updateSelectOptionByValue(inputValue);
  }

  setDefaultSelectValue() {
    this.isBagForm() ? this.densitySelect?.patchValue(this.densityOptions[1]) : this.densitySelect?.patchValue(this.densityOptions[0]);
  }
  updateSelectOptionByValue(value: string): void {
    if (value == null || value == '0') {
      return;
    }
    let option = this.findDensityOptionsBy.value(value, this.densityOptions);

    if (!option) {
      const isCustomOption = this.densityOptions.some(option => option.key == 'Custom');
      if (!isCustomOption) {
        this.addCustomOption();
      }
      this.updateCustomOptionValue(value);
      this.isBagForm() ? localStorage.setItem('Bag-Custom', value) : localStorage.setItem('Roll-Custom', value);
      
      option = this.findDensityOptionsBy.key('Custom', this.densityOptions);
    }
    this.densitySelect?.patchValue(option);
  }
  updateSelectOptionByKey(key: string) {
    let option = this.findDensityOptionsBy.key(key, this.densityOptions);
    if (option) this.densitySelect?.patchValue(option);
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
  isBagForm () {
    return this.parentForm.controls['thickness'] ? true : false;
  }

  setLocalStorigeBagItems(data: any) {
    localStorage.setItem('Bag-Density', data.value);
    localStorage.setItem('Bag-Selected', data.key);
  }
  setLocalStorigeRollItems(data: any) {
    localStorage.setItem('Roll-Density', data.value);
    localStorage.setItem('Roll-Selected', data.key);
  }
}


