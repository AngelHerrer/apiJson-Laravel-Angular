import { Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/catch';
import { EnvironmentService } from "./../shared/environment/environment.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class EmployeeService {

  constructor(
    private _http: HttpClient,
    private environmentService: EnvironmentService
  ) {}

  getEmployees(page){
    let url = this.environmentService.setApiServiceWithPage('employee', page)
    return this._http.get(url)
        .map(res=> res)
        .catch(this.handleError)
  }

  getEmployeeById($id){
    let url = this.environmentService.setApiServiceById('employee', $id)
    return this._http.get(url)
        .map(res=> res)
        .catch(this.handleError)
  }

  addEmployees(employeeData){
    let url = this.environmentService.setApiService('employee')
    return this._http.post(url, employeeData)
        .map(res=> res)
        .catch(this.handleError)
  }

  updateEmployee(employeeData){
    let url = this.environmentService.setApiServiceById('employee', employeeData.id)
    return this._http.put(url, employeeData)
        .map(res=> res)
        .catch(this.handleError)
  }

  deleteEmployee($id){
    let url = this.environmentService.setApiServiceById('employee', $id)
    return this._http.delete(url)
        .map(res=> res)
        .catch(this.handleError)
  }

  private handleError (error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
