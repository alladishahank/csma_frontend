import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-assessment-table',
  templateUrl: './assessment-table.component.html',
  styleUrls: ['./assessment-table.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule]
})
export class AssessmentTableComponent implements OnInit {
  displayedColumns: string[] = ['assessmentName', 'customerName', 'projectId', 'assessorName', 'assessmentDate', 'amaScore'];
  dataSource: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchAssessments();
  }

  fetchAssessments(): void {
    const url = 'http://localhost:8080/api/assessments/details';
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching assessments:', err)
    });
  }
}
