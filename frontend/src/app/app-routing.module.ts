import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { EmployeesIndexComponent }   from './employees/employees-index/employees-index.component';
import { EmployeesAddComponent }   from './employees/employees-add/employees-add.component';
import { EmployeesUpdateComponent }   from './employees/employees-update/employees-update.component';
import { LoginComponent }   from './login/login.component';
import { LogoutComponent }   from './logout/logout.component';
import { AboutComponent }   from './about/about.component';
import { RegisterComponent }   from './register/register.component';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/employee', 
    pathMatch: 'full' 
  },
  {
    path: 'employee',
    canActivate: [ ProtectedGuard ],
    component: EmployeesIndexComponent 
  },
  { path: 'employee/add', canActivate: [ ProtectedGuard ], component: EmployeesAddComponent },
  { path: 'employee/update/:id', canActivate: [ ProtectedGuard ], component: EmployeesUpdateComponent },
  { path: 'login', canActivate: [ PublicGuard ], component: LoginComponent },
  { path: 'logout', canActivate: [ ProtectedGuard ], component: LogoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', canActivate: [ PublicGuard ], component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' } // catch any unfound routes and redirect to home page
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}