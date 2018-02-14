import { Component, OnInit, Input } from '@angular/core';

import {BudgetCategory} from '../budget-category';
import {CategorySummary} from '../category-summary';
import {BudgetItem} from '../budget-item';
import {BUDGETCATEGORIES} from '../mock-budget-categories';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})
export class BudgetChartComponent implements OnInit {
  @Input() monthYear: number;
  categoryList: BudgetCategory[] = BUDGETCATEGORIES;
  categories: CategorySummary[];
  @Input() budgetItems: BudgetItem[];
  total: number;
  totalIncome: number;
  // Pie
  public strCategories: string[] = [];
  public strIncomeCategories: string[] = [];

public pieChartLabels: string[] = this.strCategories;
public incomeChartLabels: string[] = [];
public pieChartData: string[] = [];
public incomeChartData: string[] = [];
public pieChartType = 'pie';

// events
public chartClicked(e: any): void {
  console.log(e.active[0]);
}

public chartHovered(e: any): void {
  console.log(e);
}

  constructor() { }

  ngOnInit() {
    this.totalIncome = Number.parseFloat(localStorage.getItem('totalIncome' + this.monthYear.toString()));
    if (!this.totalIncome) {
      this.totalIncome = 0;
    }
    for (let i = 0; i < this.categoryList.length; i++) {
      this.strCategories.push(this.categoryList[i].name);
      this.strIncomeCategories.push(this.categoryList[i].name);
    }
    const categorySummary = [];
    let total = 0;
    for (let i = 0; i < this.categoryList.length; i++) {
      let categoryTotal = 0;
      const categoryName = this.categoryList[i].name;
      const newCategory = {'name': '', 'amount': 0};
      newCategory.name = categoryName;
      let amount = 0;
      for (let q = 0; q < this.budgetItems.length; q++) {
        amount = Number.parseFloat(this.budgetItems[q].amount.toString());
        if (this.budgetItems[q].category === categoryName) {
          total += amount;
          categoryTotal += amount;
        }
      }
      newCategory.amount = categoryTotal;
      categorySummary.push(newCategory);
    }
    for (let i = 0; i < this.strCategories.length; i++) {
      this.strIncomeCategories[i] += ' (' + (100 * categorySummary[i].amount / this.totalIncome).toFixed(2) + '%)';
      this.strCategories[i] += ' (' + (100 * categorySummary[i].amount / total).toFixed(2).toString() + '%)';
    }
    for (let i = 0; i < categorySummary.length; i++) {
      this.pieChartData.push(categorySummary[i].amount.toString());
      this.incomeChartData.push(categorySummary[i].amount.toString());
    }
    this.categories = categorySummary;
    this.total = total;
    this.incomeChartLabels = this.strIncomeCategories;
    this.incomeChartLabels[this.strCategories.length] = 'Savings (' + ( 100 * (this.totalIncome - total) / this.totalIncome).toFixed(2) + '%)';
    console.log(this.incomeChartLabels);
    this.incomeChartData.push((this.totalIncome - this.total).toString());

  }

}
