import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './shared/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { DeleteVerificationDialogComponent } from './delete-verification-dialog/delete-verification-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-manager-angular';

  employees: Employee[];

  constructor(private employeeService: EmployeeService,
      public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshEmployees();
  }

  refreshEmployees = () : void => {
    this.employeeService.getEmployees().subscribe({
        next: (data: Employee[]) => this.employees = data,
        error: (error: HttpErrorResponse) => alert(error.message)
    })
  }

  openEmployeeForm(employee: Employee): void {
    let dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      width: '500px',
      data: employee
    })

    dialogRef.afterClosed().subscribe({
      next: () => this.refreshEmployees()
    })
  }

  openDeletionDialog(employee: Employee): void {
    let dialogRef = this.dialog.open(DeleteVerificationDialogComponent, {
      width: '500px',
      data: employee
    })

    dialogRef.afterClosed().subscribe({
      next: () => this.refreshEmployees()
    })
  }

  searchEmployees = (key: string): void => {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.refreshEmployees();
    }
  }
}
