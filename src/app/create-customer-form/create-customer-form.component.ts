import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';

@Component({
  selector: 'app-create-customer-form',
  templateUrl: './create-customer-form.component.html',
  styleUrls: ['./create-customer-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class CreateCustomerFormComponent implements OnInit {
  createCustomerForm: FormGroup;
  @Output() customerCreated = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<CreateCustomerFormComponent>
  ) {
    this.createCustomerForm = this.fb.group({
      customerName: ['', Validators.required],
      tenantId: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      subscriptionStartDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createCustomerForm.valid) {
      const newCustomer = {
        name: this.createCustomerForm.value.customerName,
        tenant_id: this.createCustomerForm.value.tenantId,
        point_of_contact_email: this.createCustomerForm.value.contactEmail,
        subscriptionStartDate: this.createCustomerForm.value.subscriptionStartDate
      };

      this.http.post<Customer>('http://localhost:8080/api/customers/create', newCustomer)
        .subscribe({
          next: (response: any) => {
            console.log('Customer created successfully', response);
            this.customerCreated.emit();
            this.dialogRef.close();
          },
          error: (error: any) => {
            console.error('There was an error creating the customer', error);
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
