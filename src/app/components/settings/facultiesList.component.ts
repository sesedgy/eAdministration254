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
    private facultyBeforeChanges: Faculty;

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
        let facultyList = this.facultyList;
        this.faculty.CreatedDate = new Date();
        this.facultyService.create(this.faculty).subscribe(() => {
           facultyList.push(this.faculty);
            this.rowCount++;
            $("#modalWindow").modal('hide');
        });
    }

    editRow(faculty: Faculty){
        this.faculty = faculty;
        this.faculty.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.facultyBeforeChanges = faculty;
        this.isAddRow = false;
        this.modalHeader = "Изменить запись";
        $("#modalWindow").modal('show');
    }

    editRowSave(){
        let facultyList = this.facultyList;
        this.faculty.UpdatedDate = new Date();
        this.facultyService.update(this.faculty).subscribe(() => {
            let index = facultyList.lastIndexOf(this.facultyBeforeChanges);
            facultyList[index] = this.faculty;
            $("#modalWindow").modal('hide');
        });
    }

    deleteRow(faculty: Faculty){
        let facultyList = this.facultyList;
        this.facultyService.delete(faculty.FacultyId).subscribe(() => {
            let index = facultyList.lastIndexOf(faculty);
            facultyList.splice(index , 1);
            this.rowCount--;
        });
    }

}
