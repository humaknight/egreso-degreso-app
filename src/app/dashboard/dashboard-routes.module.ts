import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
   { path: '', component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard]
   },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
