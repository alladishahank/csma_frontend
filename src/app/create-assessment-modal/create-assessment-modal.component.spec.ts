import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-assessment-modal',
  templateUrl: './create-assessment-modal.component.html',
  styleUrls: ['./create-assessment-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class CreateAssessmentModalComponent implements OnInit {
openCreateCustomerModal() {
throw new Error('Method not implemented.');
}
onCreateCustomer() {
throw new Error('Method not implemented.');
}
  createAssessmentForm: FormGroup;
  customers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<CreateAssessmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router // Inject the Router
  ) {
    this.createAssessmentForm = this.fb.group({
      customerName: ['', Validators.required],
      projectId: ['', Validators.required],
      apiKey: ['', Validators.required],
      assessmentDescription: ['', Validators.required],
      customerContactEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    const url = 'http://localhost:8080/api/customers/names';
    this.http.get<string[]>(url).subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => console.error('Error fetching customer names:', err)
    });
  }

  onSubmit(): void {
    if (this.createAssessmentForm.valid) {
      console.log('Form data:', this.createAssessmentForm.value);
      this.dialogRef.close(this.createAssessmentForm.value);
      this.router.navigate(['/new-assessment']); // Navigate to the new route
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
