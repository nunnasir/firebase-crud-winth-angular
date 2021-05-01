import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/pages/employees/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: any;
  employeeFrom: FormGroup = new FormGroup({});
  private isEmail = /\s+@\s+\.\s+/;

  constructor(private router: Router,
              private fb: FormBuilder,
              private empService: EmployeeService) { 
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state;
    this.initForm();
  }

  ngOnInit(): void {
    if(typeof this.employee === 'undefined') {
      this.router.navigate(['new']);
    } else {
      this.employeeFrom.patchValue(this.employee);
    }

  }

  onSave(): void {
    if(this.employeeFrom.valid) {
      const employee = this.employeeFrom.value;
      const empId = this.employee?.id || null;

      this.empService.onSaveEmployee(employee, empId);
      this.employeeFrom.reset();
      this.router.navigate(['list']);
    }

  }

  isValidField(field: string): string {
    const validateField = this.employeeFrom.get(field);
    return (!validateField?.valid && validateField?.touched)
      ? 'is-invalid' : validateField?.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.employeeFrom = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
    });
  }

  onGoToBack(): void {
    this.router.navigate(['list'])
  }
}
