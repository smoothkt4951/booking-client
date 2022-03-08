import { UsersTableComponent } from './components/users-table/users-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/material.module';
import { CommonComponentsModule } from 'app/common/common-components.module';
// import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    DashboardComponent,
    UsersTableComponent,
    UserDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CommonComponentsModule,
  ],
  exports: [UserManagementComponent, DashboardComponent, UsersTableComponent],
})
export class AdminModule {}
