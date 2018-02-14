import {Injectable} from '@angular/core';
import {BudgetItem} from './budget-item';
import {BUDGETITEMS} from './mock-budget-items';
import {BudgetCategory} from './budget-category';
@Injectable()
export class BudgetItemService {
  getBudgetItems(category: BudgetCategory, monthYear: number, isCurrentMonth: boolean): BudgetItem[] {
  // localStorage.clear();
  let budgetItems = [];
  let localBudgetItems: BudgetItem[];
  localBudgetItems = JSON.parse(localStorage.getItem('budgetItems' + monthYear.toString()));
  const result = [];
  // if no budget items for current month use mock-db
  if (!localBudgetItems && isCurrentMonth) {
    for (let i = 0; i < BUDGETITEMS.length; i++) {
        budgetItems.push(BUDGETITEMS[i]);
    }
   } else {
     budgetItems = localBudgetItems;
  }
  if (isCurrentMonth) {  // if current use current local storage
  localStorage.setItem('budgetItems' + monthYear.toString(), JSON.stringify(budgetItems));
} else { // if not current use not current local storage
  if (budgetItems) { // if budgetitems is not null add to storage
  localStorage.setItem(monthYear.toString() + 'budget', JSON.stringify(budgetItems));
}
}
if (budgetItems) {
  for (let i = 0; i < budgetItems.length; i++) {
    if (budgetItems[i].category === category.name) {
      result.push(budgetItems[i]);
    }
  }
}
  return result;
}
addBudgetItem(budgetItem: BudgetItem): void {
  console.log(budgetItem);
}
  constructor() { }

}
