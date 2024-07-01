import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CreateCustomerFormComponent } from '../create-customer-form/create-customer-form.component'; 
import { AssessmentDataService } from '../assessment-data.service';

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
    ReactiveFormsModule
  ],
})
export class CreateAssessmentModalComponent implements OnInit {
  createAssessmentForm: FormGroup;
  customers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<CreateAssessmentModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private router: Router,
    private assessmentDataService: AssessmentDataService
  ) {
    this.createAssessmentForm = this.fb.group({
      assessmentName: ['', Validators.required],
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

  onNext(): void {
    if (this.createAssessmentForm.valid) {
      const assessmentData = {
        customerName: this.createAssessmentForm.value.customerName,
        projectId: this.createAssessmentForm.value.projectId,
        apiKey: this.createAssessmentForm.value.apiKey,
        assessmentDescription: this.createAssessmentForm.value.assessmentDescription,
        customerContactEmail: this.createAssessmentForm.value.customerContactEmail,
        assessmentName: this.createAssessmentForm.value.assessmentName,
        assessorName: 'John Doe', 
        assessmentDate: new Date().toISOString().split('T')[0] 
      };

      this.assessmentDataService.setAssessmentData(assessmentData);
      this.dialogRef.close();
      this.router.navigate(['/new-assessment']);
    } else {
      this.createAssessmentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openCreateCustomerModal(): void {
    const dialogRef = this.dialog.open(CreateCustomerFormComponent, {
      width: '600px', 
      maxWidth: '90vw' 
    });

    dialogRef.componentInstance.customerCreated.subscribe(() => {
      this.fetchCustomers();
    });
  }
}
