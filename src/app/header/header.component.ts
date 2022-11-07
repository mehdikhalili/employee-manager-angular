import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() refreshEmployees: () => void;

  @Input() searchEmployees: (key: string) => void;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEmployeeForm(): void {
    let dialogRef = this.dialog.open(AddEditEmployeeComponent, {width: '500px'})
    dialogRef.afterClosed().subscribe(() => this.refreshEmployees());
  }
  
}
