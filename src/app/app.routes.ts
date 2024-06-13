import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssessmentModalComponent } from './create-assessment-modal/create-assessment-modal.component';
import { CreateCustomerFormComponent } from './create-customer-form/create-customer-form.component';

export const routes: Routes = [
  { path: 'create-assessment', component: CreateAssessmentModalComponent },
  { path: 'create-customer', component: CreateCustomerFormComponent },
  { path: '', redirectTo: '/create-assessment', pathMatch: 'full' },
  { path: '**', redirectTo: '/create-assessment' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
