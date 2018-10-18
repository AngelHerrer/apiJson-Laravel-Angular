import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EmployeeService} from "./../employee.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationService } from './../../shared';

@Component({
  selector: 'app-employees-update',
  templateUrl: './employees-update.component.html',
  styleUrls: ['./employees-update.component.css']
})
export class EmployeesUpdateComponent implements OnInit {

  	employeeData = {isbn:'', title:'', author:'', description:'', image:''}
  	message = ''
  	constructor(
  		private employeeService: EmployeeService, 
  		private router: Router,
  		private route: ActivatedRoute,
  		private location: Location,
      private spinnerService: Ng4LoadingSpinnerService,
      private notificationService: NotificationService
  	) { }

  ngOnInit() {
  	this.getEmployeeById()
  }
  getEmployeeById(){
    this.spinnerService.show();
  	const $id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById($id)
      .subscribe((response) => {
        this.employeeData = response.data
        this.spinnerService.hide();
    })
  }

  updateEmployee() {
    this.spinnerService.show();
  	this.employeeService.updateEmployee(this.employeeData)
      .subscribe((value) => {
        this.spinnerService.hide();
        this.notificationService.onSuccess('Successfully Updated.')
        this.router.navigate(['employee']);   
      });
  }
}
