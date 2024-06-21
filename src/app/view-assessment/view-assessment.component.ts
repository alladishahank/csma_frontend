import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class ViewAssessmentComponent implements OnInit {
  assessmentId: string | null = null;
  assessmentDetails: any = null;
  groupedScores: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.assessmentId = this.route.snapshot.paramMap.get('id');
    if (this.assessmentId) {
      this.fetchAllAssessmentDetails(this.assessmentId);
    }
  }

  fetchAllAssessmentDetails(id: string): void {
    const url = `http://localhost:8080/api/assessments/fullDetails`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        const assessment = data.find(item => item.id.toString() === id);
        if (assessment) {
          this.assessmentDetails = assessment;
          this.groupedScores = this.groupParametersByCategory(assessment.assessmentScores);
        }
      },
      error: (err) => console.error('Error fetching assessment details:', err)
    });
  }

  groupParametersByCategory(scores: any[]): any[] {
    const grouped = scores.reduce((acc: any[], score: any) => {
      const category = acc.find(item => item.categoryName === score.categoryName);
      if (category) {
        category.scores.push(score);
      } else {
        acc.push({ categoryName: score.categoryName, scores: [score] });
      }
      return acc;
    }, []);
    return grouped;
  }

  getCustomerScoringLevel(amaScore: number): string {
    if (amaScore <= 5) {
      return 'Navigator';
    } else if (amaScore <= 8) {
      return 'Voyager';
    } else {
      return 'Visionary';
    }
  }

  
}
