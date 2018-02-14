import { Component, OnInit, Input } from '@angular/core';
import { BudgetItem } from '../budget-item';
import { BudgetCategory } from '../budget-category';
import { BudgetItemService } from '../budget-item.service';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.css']
})
export class BudgetItemComponent implements OnInit {
  @Input() category: BudgetCategory;
  @Input() color: string;
  @Input() monthYear: number;
  @Input() isCurrentMonth: boolean;
  budgetItems: BudgetItem[];
  selectedItem: BudgetItem;


  getBudgetItems(category): void {
    this.budgetItems = this.budgetItemService.getBudgetItems(category, this.monthYear, this.isCurrentMonth);
  }
  constructor(private budgetItemService: BudgetItemService) { }

  ngOnInit() {
    this.getBudgetItems(this.category);
  }
  onSelect(item: BudgetItem): void {
    this.selectedItem = item;
    const elems = document.getElementsByClassName('edit');
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add('hidden');
    }
    const categoryDiv = document.getElementById('edit' + this.selectedItem.category);
    if (categoryDiv) { categoryDiv.classList.remove('hidden');
   }
  }
  deleteSelect(item: BudgetItem): void {
      if (confirm('Are you sure you want to delete "' + item.name + '"?')) {
    const listItem = document.getElementById('li' + item.id.toString()).parentElement;
    listItem.style.display = 'none';
    this.deleteItem(item.id);
  }
  }
  deleteItem(id: number) {
    const oldBudget = JSON.parse(localStorage.getItem('budgetItems' + this.monthYear.toString()));
    const result = [];
    for (let i = 0; i < oldBudget.length; i++) {
      if (oldBudget[i].id !== id) {
        result.push(oldBudget[i]);
      }
    }
    localStorage.setItem('budgetItems' + this.monthYear.toString(), JSON.stringify(result));
  }

}
