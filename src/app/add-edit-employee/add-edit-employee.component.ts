import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  isAddForm: boolean;

  @ViewChild('eForm') employeeFormDerective: any;

  formErrors: IFormErrors = {
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imageUrl: ''
  };

  validationMessages: IValidationMessages = {
    name: {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 50 characters long.'
    },
    phone: {
      'required': 'Phone number is required.',
      'pattern': 'Phone number must contain only numbers.'
    },
    email: {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    jobTitle: {
      'required': 'Job title is required.',
      'minlength': 'Job title must be at least 2 characters long.',
      'maxlength': 'Job title cannot be more than 50 characters long.'
    },
    imageUrl: {
      'required': 'Image URL is required.',
      'pattern': 'Image URL not in valid format.'
    }
  };

  constructor(public dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public employee: Employee) {

      this.isAddForm = (employee) ? false : true;

      this.createForm()
  }

  ngOnInit(): void {
    console.log(this.employee)
    console.log("is add form ? "+ this.isAddForm)
  }

  createForm(): void {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee?.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.employee?.email, [Validators.required, Validators.email]],
      jobTitle: [this.employee?.jobTitle, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone: [this.employee?.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
      imageUrl: [this.employee?.imageUrl, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    })

    this.employeeForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged()
  }

  onValueChanged(data?: any): void {
    if (!this.employeeForm) { return; }
    const form = this.employeeForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field as keyof IFormErrors] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as keyof IValidationMessages];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field as keyof IFormErrors] += messages[key as keyof IValidationMessage] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) { return; }

    if (this.isAddForm) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        error: (error: HttpErrorResponse) => alert(error.message)
      })
    } else {
      const updatedEmployee: Employee = this.employeeForm.value;
      updatedEmployee.id = this.employee.id
      updatedEmployee.employeeCode = this.employee.employeeCode

      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        error: (error: HttpErrorResponse) => alert(error.message)
      })
    }

    this.employeeForm.reset()

    this.employeeFormDerective.resetForm()

    this.dialogRef.close();
    
  }

  getFormTitle(): string {
    return this.isAddForm ? 'Add Employee' : 'Update Employee';
  }
    
}

interface IFormErrors {
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  imageUrl: string;
}

interface IValidationMessage {
  required?: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;
  email?: string;
}

interface IValidationMessages {
  name: IValidationMessage;
  email: IValidationMessage;
  jobTitle: IValidationMessage;
  phone: IValidationMessage;
  imageUrl: IValidationMessage;
}
