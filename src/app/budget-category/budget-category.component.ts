import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BudgetCategory } from '../budget-category';
import { BUDGETCATEGORIES } from '../mock-budget-categories';
import { BudgetItem } from '../budget-item';
import { BudgetItemService } from '../budget-item.service';
@Component({
  selector: 'app-budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.css']
})
export class BudgetCategoryComponent implements OnInit {
  @Input() monthYear: number;
  @Input() budgetItems: BudgetItem[];
  selectedCategory: BudgetCategory = {id: 2, name: 'Utilities', priority: 2, color: 'red'};
  budgetCategories = BUDGETCATEGORIES;
  newBudgetItem: BudgetItem;
  isCurrentMonth: boolean;
  rerender = false;
  newItem: BudgetItem = {id: 0, name: '', amount: 0, category: ''};
  constructor(
    private budgetItemService: BudgetItemService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    const dt = new Date();
    let mm = (dt.getMonth() + 1).toString();
    if (Number.parseInt(mm) < 10) {
      mm = '0' + mm.toString();
    }
    const monthYear = (dt.getFullYear().toString() + mm);
    if (this.monthYear === Number.parseInt(monthYear)) {
      this.isCurrentMonth = true;
    } else {
      this.isCurrentMonth = false;
    }
  }
  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
  }
  // todo migrate localstorage to service
  add(name, amount, category) {
    console.log(this.newItem);
    let oldBudget = this.budgetItems;
    // let oldBudget = JSON.parse(localStorage.getItem('budgetItems' + this.monthYear.toString()));
     //  {'name': '', 'amount': '', 'category': '', 'id': ''};
    this.newItem.name = name;
    this.newItem.amount = amount;
    this.newItem.category = category;
    if (!oldBudget) {
      console.log('if');
      this.newItem.id = 1;
      oldBudget = [];
    } else {
      console.log('else');
      this.newItem.id = oldBudget.length;
    }
    console.log(this.newItem);
    oldBudget.push(this.newItem);
    localStorage.setItem('budgetItems' + this.monthYear.toString(), JSON.stringify(oldBudget));
    oldBudget.push(this.newItem);
    this.budgetItems = oldBudget;
    this.doRerender();
}
  addClick(category) {
    document.getElementById('addmodal').classList.remove('hidden');
    this.selectedCategory.name = category;
  }
  closeAddClick(category) {
  //  console.log(document.getElementById('addmodal'));
    document.getElementById('addmodal').classList.add('hidden');
  }
  hideElements(elems) {
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add('hidden');
    }
  }
  showElements(elems) {
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove('hidden');
    }
  }
}
