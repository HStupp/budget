import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BudgetItemComponent } from './budget-item/budget-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { BudgetItemService } from './budget-item.service';
import { MessageService } from './message.service';
import { BudgetCategoryComponent } from './budget-category/budget-category.component';
import { BudgetChartComponent } from './budget-chart/budget-chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MonthPickerComponent } from './month-picker/month-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetItemComponent,
    ItemDetailComponent,
    BudgetCategoryComponent,
    BudgetChartComponent,
    MonthPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule
  ],
  providers: [BudgetItemService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
