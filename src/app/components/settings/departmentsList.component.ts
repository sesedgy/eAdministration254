import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {FacultyService} from "../../services/api/faculty.service";
import {Faculty} from "../../models/faculty";
import {GuidService} from "../../services/guid.service";
import {CookieService} from "../../services/cookie.service";
import {Department} from "../../models/department";
import {DepartmentService} from "../../services/api/department.service";
declare let $:any;

@Component({
    selector: 'departmentsList',
    templateUrl: './../../views/settings/departments_list.html'
})

export class DepartmentsListComponent implements OnInit{

    private departmentList: Department[];
    private rowCount: number;
    private isAddRow: boolean;
    private modalHeader: string;
    private department: Department = new Department();

    constructor(private departmentService: DepartmentService,
                private guidService: GuidService,
                private cookieService: CookieService){}

    ngOnInit(){
        this.departmentService.getAll().subscribe((response:Response) => {
            this.departmentList = response.json();
            this.rowCount = this.departmentList.length;
        });
    }

    addRow(){
        this.department = new Department();
        this.department.DepartmentId = this.guidService.createGuid();
        this.department.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.isAddRow = true;
        this.modalHeader = "Добавить запись";
        $("#modalWindow").modal('show');
    }

    addRowSave(){
        this.department.CreatedDate = new Date();
        this.departmentService.create(this.department).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно добавлены',
                class_name: 'gritter-success'
            });
            this.ngOnInit();
            $("#modalWindow").modal('hide');
        });
    }

    editRow(department: Department){
        this.department = department;
        this.department.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.isAddRow = false;
        this.modalHeader = "Изменить запись";
        $("#modalWindow").modal('show');
    }

    editRowSave(){
        this.department.UpdatedDate = new Date();
        this.departmentService.update(this.department).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно изменены',
                class_name: 'gritter-success'
            });
            this.ngOnInit();
            $("#modalWindow").modal('hide');
        });
    }

    deleteRow(department: Department){
        this.departmentService.delete(department.DepartmentId).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно удалены',
                class_name: 'gritter-success'
            });
            this.ngOnInit();
        });
    }

    handleFilter(dataTable){
        this.rowCount =  dataTable.totalRecords;
    }

}
