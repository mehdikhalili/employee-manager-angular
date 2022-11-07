import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';
import { HeaderComponent } from './header/header.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { DeleteVerificationDialogComponent } from './delete-verification-dialog/delete-verification-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddEditEmployeeComponent,
    DeleteVerificationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    EmployeeService,
  ],
  entryComponents: [
    AddEditEmployeeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
