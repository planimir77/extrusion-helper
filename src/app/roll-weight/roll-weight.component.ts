import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { RollWeightCalculator } from './roll-weight-calculator';

@Component({
  selector: 'app-roll-weight',
  templateUrl: './roll-weight.component.html',
  styleUrls: ['./roll-weight.component.scss']
})
export class RollWeightComponent implements OnInit {

  //calculatorControl = new FormControl('');

  calculator: RollWeightCalculator = {
    spullDiameter: 10.5,
    density: 0.92,
    weight: 0,
    rollR: 0,
    result: 0,
    spullVolume: 0,
    spullRadius: 0,
  } ;
  result!: number;
  
  constructor() {}
  
  ngOnInit(): void {}

  weightKeyup (event: any ): void {
    this.checkInput(event);

    this.calculator.spullRadius = this.calculator.spullDiameter / 2;
    this.calculator.spullVolume = Math.PI * Math.pow(this.calculator.spullRadius, 2) * this.calculator.weight;

    this.calculateResult();
  }

  rollRKeyup(event: any): void {
    this.checkInput(event);
    if(this.calculator.rollR >= 0){
      this.calculateResult();
    }
  }

  checkInput(event: any): void {
    const code:string = event.code;
    if (!code.startsWith("Digit")) {
      event.preventDefault();
    }
  }
  calculateResult(): void {
    const rollVolume = Math.PI * Math.pow(this.calculator.spullRadius + this.calculator.rollR , 2) * this.calculator.weight;
    this.calculator.result = ((rollVolume - this.calculator.spullVolume) * this.calculator.density) / 1000 ;
  }
}
