import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {FacultyService} from "../../services/api/faculty.service";
import {Faculty} from "../../models/faculty";
import {GuidService} from "../../services/guid.service";
import {CookieService} from "../../services/cookie.service";
declare let $:any;

@Component({
    selector: 'faculties',
    templateUrl: './../../views/settings/faculties_list.html'
})

export class FacultiesListComponent implements OnInit{

    private facultyList: Faculty[];
    private rowCount: number;
    private isAddRow: boolean;
    private modalHeader: string;
    private faculty: Faculty = new Faculty();

    constructor(private facultyService: FacultyService,
                private guidService: GuidService,
                private cookieService: CookieService){}

    ngOnInit(){
        this.facultyService.getAll().subscribe((response:Response) => {
            this.facultyList = response.json();
            this.rowCount = this.facultyList.length;
        });

    }

    addRow(){
        this.faculty = new Faculty();
        this.faculty.FacultyId = this.guidService.createGuid();
        this.faculty.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.isAddRow = true;
        this.modalHeader = "Добавить запись";
        $("#modalWindow").modal('show');
    }

    addRowSave(){
        this.faculty.CreatedDate = new Date();
        this.facultyService.create(this.faculty).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно добавлены',
                class_name: 'gritter-success'
            });
            this.ngOnInit();
            $("#modalWindow").modal('hide');
        });
    }

    editRow(faculty: Faculty){
        this.faculty = faculty;
        this.faculty.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.isAddRow = false;
        this.modalHeader = "Изменить запись";
        $("#modalWindow").modal('show');
    }

    editRowSave(){
        this.faculty.UpdatedDate = new Date();
        this.facultyService.update(this.faculty).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно изменены',
                class_name: 'gritter-success'
            });
            this.ngOnInit();
            $("#modalWindow").modal('hide');
        });
    }

    deleteRow(faculty: Faculty){
        this.facultyService.delete(faculty.FacultyId).subscribe(() => {
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
