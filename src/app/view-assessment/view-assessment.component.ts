import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { response } from 'express';


@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, FormsModule]
})
export class ViewAssessmentComponent implements OnInit {
  assessmentId: string | null = null;
  assessmentDetails: any = null;
  groupedScores: any[] = [];
  isEditMode: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

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

  getTooltipText(scoringLevel: string): string {
    switch (scoringLevel) {
      case 'Navigator':
        return 'AMA Score is 5 or below';
      case 'Voyager':
        return 'AMA Score up to 8';
      case 'Visionary':
        return 'AMA Score above 8';
      default:
        return '';
    }
  }

  onEdit(): void {
    console.log('Edit button clicked');
    this.isEditMode = true;
  }

  validateScore(score: any): void {
    if (score.score > 10) {
      score.score = 10;
    }
    if (score.score < 0) {
      score.score = 0;
    }
  }

  onSave(): void {
    for (const category of this.groupedScores) {
      for (const score of category.scores) {
        if (score.score > 10) {
          score.score = 10;
        }
      }
    }
    const jsonPayload = {
      assessmentId: this.assessmentDetails.id,
      scores: this.groupedScores.flatMap(category =>
        category.scores.map((score: { parameterId: any; score: any; }) => ({
          parameterId: score.parameterId,
          score: score.score
        }))
      )
    };
    console.log('Generated JSON:', JSON.stringify(jsonPayload, null, 2));

    this.http.post('http://localhost:8080/api/assessment-scores/updateScores', jsonPayload).subscribe({
      next: (response) => {
        console.log('Scores updated successfully:', response);
        this.fetchAllAssessmentDetails(this.assessmentId as string); 
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error updating scores:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
