import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponentComponent } from '../app/main-component/main-component.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './index/index.module#IndexModule'
      },
      {
        path: 'teachers',
        loadChildren: './teachers/teachers.module#TeachersModule'
      },
      {
        path: 'staff',
        loadChildren: './staff/staff.module#StaffModule'
      },
      {
        path: 'parents',
        loadChildren: './parents/parents.module#ParentsModule'
      },
      {
        path: 'classes',
        loadChildren: './classes/classes.module#ClassesModule'
      },
      {
        path: 'sections',
        loadChildren: './sections/sections.module#SectionsModule'
      },
      {
        path: 'subjects',
        loadChildren: './subjects/subjects.module#SubjectsModule'
      },
      {
        path: 'expense',
        loadChildren: './expense/expense.module#ExpenseModule'
      },
      {
        path: 'viewexpenses',
        loadChildren: './viewexpenses2/viewexpenses2.module#ViewExpenses2Module'
      },
      {
        path: 'expensereports',
        loadChildren: './viewexpenses/viewexpenses.module#ViewExpensesModule'
      },
      {
        path: 'students',
        loadChildren: './students/students.module#StudentsModule'
      },
      {
        path: 'exams',
        loadChildren: './exams/exams.module#ExamsModule'
      },
      {
        path: 'marks',
        loadChildren: './marks/marks.module#MarksModule'
      },
      {
        path: 'results',
        loadChildren: './results/results.module#ResultsModule'
      },
      {
        path: 'assignments',
        loadChildren: './assignments/assignments.module#AssignmentsModule'
      },
      {
        path: 'quizes',
        loadChildren: './quizes/quizes.module#QuizesModule'
      },
      {
        path: 'mark-emp-attendance/:role',
        loadChildren: './mark-emp-attendance/mark-emp-attendance.module#MarkEmpAttendanceModule'
      },
      {
        path: 'view-emp-attendance',
        loadChildren: './view-emp-attendance/view-emp-attendance.module#ViewEmpAttendanceModule'
      },
      {
        path: 'attendance',
        loadChildren: './attendance/attendance.module#AttendanceModule'
      },

      {
        path: 'attendance-report',
        loadChildren:
          './attendance-report/attendance-report.module#AttendanceReportModule'
      },

      {
        path: 'fee-structure',
        loadChildren:
          './manage-fee-structure/manage-fee-structure.module#ManageFeeStructureModule'
      },
      {
        path: 'fee-heads',
        loadChildren:
          './manage-fee-heads/manage-fee-heads.module#ManageFeeHeadsModule'
      },
      {
        path: 'fee-discounts',
        loadChildren:
          './manage-fee-discounts/manage-fee-discounts.module#ManageFeeDiscountsModule'
      },
      {
        path: 'fee-invoice',
        loadChildren:
          './manage-fee-invoice/manage-fee-invoice.module#ManageFeeInvoiceModule'
      },
	  {
		path: 'fee-voucher',
        loadChildren:
          './manage-fee-voucher/manage-fee-voucher.module#ManageFeeVoucherModule'
      },
	  {
		path: 'update-voucher',
        loadChildren:
          './manage-update-voucher/manage-update-voucher.module#ManageUpdateVoucherModule'
      },
	  {
		path: 'previous-voucher',
        loadChildren:
          './manage-previous-voucher/manage-previous-voucher.module#ManagePreviousVoucherModule'
      },
	 
      {
        path: 'announcements',
        loadChildren: './announcements/announcements.module#AnnouncementsModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'students-promotion',
        loadChildren:
          './students-promotion/students-promotion.module#StudentsPromotionModule'
      },
      {
        path: 'suggestions',
        loadChildren:
          './suggestions/suggestions.module#SuggestionsModule'
      },
      {
        path: 'diary',
        loadChildren:
          './diary/diary.module#DiaryModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
