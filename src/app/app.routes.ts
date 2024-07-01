import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssessmentModalComponent } from './create-assessment-modal/create-assessment-modal.component';
import { CreateCustomerFormComponent } from './create-customer-form/create-customer-form.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component'; 
import { HomePageComponent } from './home-page/home-page.component';
import { NewAssessmentFormComponent } from './new-assessment-form/new-assessment-form.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';


export const routes: Routes = [
  { path: 'create-assessment', component: CreateAssessmentModalComponent },
  { path: 'view-assessment/:id', component: ViewAssessmentComponent },
  { path: 'create-customer', component: CreateCustomerFormComponent },
  { path: 'home', component: HomePageComponent }, 
  { path: 'new-assessment', component: NewAssessmentFormComponent },
  { path: 'assessment-summary', component: SummaryPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
