import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-delete-verification-dialog',
  templateUrl: './delete-verification-dialog.component.html',
  styleUrls: ['./delete-verification-dialog.component.css']
})
export class DeleteVerificationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private employeeService: EmployeeService) { }
    
  ngOnInit(): void {
  }

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe({
      error: (error: HttpErrorResponse) => alert(error.message)
    })

    this.dialogRef.close();
  }

}
