import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmployeeService} from "./../employee.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationService } from './../../shared';
@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {

  employeeData = {nombre:'', email:'', puesto:'', f_nacimiento:'', domicilio:'', skill:'' ,image:''}
  message = ''
  selectFiles: File = null;
  
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private employeeService: EmployeeService, 
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  onFileSelected(event)
  {
    this.selectFiles = <File>event.target.files[0]
  }

  addEmployee() {
      this.spinnerService.show();
      let fd = new FormData();
      for(let key in this.employeeData){
          fd.append(key, this.employeeData[key])
      }
      if(this.selectFiles != null)
      {
         fd.append('image',this.selectFiles,this.selectFiles.name)
      }
      console.log(this.employeeData);
      this.employeeService.addEmployees(fd)
      .subscribe((value) => {
        this.spinnerService.hide();
        this.notificationService.onSuccess('Successfully Added.')
        this.router.navigateByUrl('employee');   
      });
  }

}
