import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IEmployee } from 'src/app/shared/model/employee.interface';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees$ = this.empService.employees;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(private router: Router, 
    private empService: EmployeeService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToDetails(item: any): void {
    this.navigationExtras.state = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  async onGoToDelete(empId: any): Promise<void> {
    try {
      alert("Deleted");
      await this.empService.onDeleteEmployee(empId);
      this.router.navigate(['list']);
    } catch (error) {
      console.log(error);
    }
  }

}
