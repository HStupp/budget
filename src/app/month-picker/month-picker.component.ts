import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NgModel} from '@angular/forms';
import {BudgetItem} from '../budget-item';
@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent implements OnInit {
  monthYear: number;
  month = {id: 1, name: 'January'};
  months = [{id: 1, name: 'January'} , {id: 2, name: 'Feburay'}];
  totalIncome: number;
  rerender = false;
  budgetItems: BudgetItem[];
  constructor(private cdRef: ChangeDetectorRef) { }
  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
  }
  ngOnInit() {
    const dt = new Date();
    let mm = (dt.getMonth() + 1).toString();
    if (Number.parseInt(mm) < 10) {
      mm = '0' + mm.toString();
    }
    const monthYear = Number.parseInt(dt.getFullYear().toString() + mm);
    if (!this.monthYear) {
      this.monthYear = monthYear;
    }
    const income = Number.parseFloat(localStorage.getItem('totalIncome' + this.monthYear.toString()));
    if (!income) {
      this.totalIncome = 0;
    } else {
      this.totalIncome = income;
    }
    this.budgetItems = JSON.parse(localStorage.getItem('budgetItems' + this.monthYear.toString()));
  }
  monthYearClick(monthYear: number) {
    console.log(monthYear);
    if (!isNaN(monthYear) && monthYear.toString().length === 6) {
      this.monthYear = monthYear;
      this.doRerender();
    }
  }
  incomeChanged(income: string) {
    const numIncome = parseFloat(income);
    localStorage.setItem('totalIncome' + this.monthYear.toString(), numIncome.toFixed(2));
    this.doRerender();
  }
  showBreakdownChart(monthYear: number) {
    document.getElementById('incomechartarea').classList.add('hidden');
    document.getElementById('chartarea').classList.toggle('hidden');
  }
  showIncomeChart(monthYear: number) {
    document.getElementById('chartarea').classList.add('hidden');
    document.getElementById('incomechartarea').classList.toggle('hidden');
  }
}
