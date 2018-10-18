import { Component,ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationService } from './../../shared';
import { EmployeeService } from "./../employee.service";


@Component({
  selector: 'app-employees-index',
  templateUrl: './employees-index.component.html',
  styleUrls: ['./employees-index.component.css']
})
export class EmployeesIndexComponent implements OnInit {
  @ViewChild('EmployeeImageModal') EmployeeImageModal: ModalDirective;
  p: number = 1;
  employees = [];
  errMesg: any;
  totalRecords = 0;
  pageSize = 5;
  employeeImage = '';

  constructor(
    private spinnerService: Ng4LoadingSpinnerService, 
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  	this.getEmployee();
  }

  getEmployee(){
    this.spinnerService.show();
    this.employeeService.getEmployees(1)
      .subscribe((response) => {
        this.employees = response.data.data
        this.totalRecords =response.data.total
        this.spinnerService.hide();
      });
  }

  getPage($page)
  {
    this.spinnerService.show();
    this.employeeService.getEmployees($page)
      .subscribe((response) => {
        this.employees = response.data.data
        this.totalRecords =response.data.total
        this.p = $page
        this.spinnerService.hide();
      });
  }

  deleteEmployee($id){
    this.spinnerService.show();
    this.employeeService.deleteEmployee($id)
      .subscribe(data => {
        this.spinnerService.hide();
        this.notificationService.onSuccess('Successfully Deleted.')
        this.getEmployee()
    })
  }

  viewImage(image){
    this.employeeImage = image
    this.EmployeeImageModal.show()
  }

}
