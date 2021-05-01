import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { EmployeeFormModule } from 'src/app/shared/components/employee-form/employee-form.module';
import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';


@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    EmployeeFormModule
  ]
})
export class NewModule { }
