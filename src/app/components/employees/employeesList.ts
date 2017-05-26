import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {Discipline} from "../../models/dicipline";
import {GuidService} from "../../services/guid.service";
import {CookieService} from "../../services/cookie.service";
import {SelectItem} from "primeng/components/common/api";
import {EmployeeService} from "../../services/api/employee.service";
import {Employee} from "../../models/employee";
import {DepartmentService} from "../../services/api/department.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
declare let $:any;

@Component({
    selector: 'employees_list',
    templateUrl: './../../views/employees/employees_list.html',

})

export class EmployeesListComponent implements OnInit{

    constructor(private employeeService: EmployeeService,
                private departmentService: DepartmentService,
                private router: Router){}

    private employeesList: Employee[];
    private departmentsList: SelectItem[];
    private rowCount: number;


    ngOnInit(){
        this.employeeService.getAll().subscribe((response:Response) => {
            if(response != null) {
                this.employeesList = response.json();
                this.rowCount = this.employeesList.length;
            }
        });
        this.departmentService.getAll().subscribe((response:Response) => {
            let departmentsList = [];
            departmentsList.push({label: "", value: null});
            if (response != null) {
                let responseJson = response.json();
                responseJson.forEach(function (item) {
                    departmentsList.push({label: item.Name, value: item.Name});
                });
            }
            this.departmentsList = departmentsList;
        });
    }

    addRow(){
        this.router.navigate(['employees', 'new']);
    }

    handleFilter(dataTable){
        this.rowCount = dataTable.totalRecords;
    }

    //
    // deleteRow(employee: Employee){
    //     let employeeList = this.employeesList;
    //     this.employeeService.delete(employee.EmployeeId).subscribe(() => {
    //         let index = employeeList.lastIndexOf(employee);
    //         employeeList.splice(index , 1);
    //         this.rowCount--;
    //     });
    // }

}
