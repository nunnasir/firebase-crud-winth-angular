import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IEmployee } from 'src/app/shared/model/employee.interface';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }
  employee: any;
  
  constructor(private router: Router,
              private empService: EmployeeService) { 
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state;
  }

  ngOnInit(): void {
    console.log(this.employee)
    
    // if(typeof this.employee === 'undefined') {
    //   this.router.navigate(['list']);
    // }
  }

  onGoToEdit(): void {
    this.navigationExtras.state = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(): Promise<void> {
    try {
      alert("Deleted");
      await this.empService.onDeleteEmployee(this.employee?.id);
      this.router.navigate(['list']);
    } catch (error) {
      console.log(error);
    }
  }

  onGoToBack(): void {
    this.router.navigate(['list'])
  }

}
