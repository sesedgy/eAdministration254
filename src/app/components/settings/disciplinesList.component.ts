import {Component, OnInit} from "@angular/core";
import {DisciplineService} from "../../services/api/discipline.service";
import {Response} from "@angular/http";
import {Discipline} from "../../models/dicipline";
import {GuidService} from "../../services/guid.service";
import {CookieService} from "../../services/cookie.service";
import {FacultyService} from "../../services/api/faculty.service";
import {SelectItem} from "primeng/components/common/api";
declare let $:any;

@Component({
    selector: 'disciplines',
    templateUrl: './../../views/settings/disciplines_list.html'
})

export class DisciplinesListComponent implements OnInit{

    constructor(private disciplineService: DisciplineService,
                private facultyService: FacultyService,
                private guidService: GuidService,
                private cookieService: CookieService){}

    private disciplineList: Discipline[];
    private facultiesList: SelectItem[];
    private rowCount: number;
    private isAddRow: boolean;
    private modalHeader: string;
    private discipline: Discipline = new Discipline();
    private disciplineBeforeChanges: Discipline;


    ngOnInit(){
        this.disciplineService.getAll().subscribe((response:Response) => {
            if(response != null) {
                this.disciplineList = response.json();
                this.rowCount = this.disciplineList.length;
            }
        });
        this.facultyService.getAll().subscribe((response:Response) => {
            let facultiesList = [];
            facultiesList.push({label: "", value: null});
            if (response != null) {
                let responseJson = response.json();
                responseJson.forEach(function (item) {
                    facultiesList.push({label: item.Name, value: item});
                });
            }
            this.facultiesList = facultiesList;
        });
    }

    addRow(){
        this.discipline = new Discipline();
        this.discipline.DisciplineId = this.guidService.createGuid();
        this.discipline.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.isAddRow = true;
        this.modalHeader = "Добавить запись";
        $("#modalWindow").modal('show');
    }

    addRowSave(){
        let disciplineList = this.disciplineList;
        this.discipline.CreatedDate = new Date();
        this.disciplineService.create(this.discipline).subscribe(() => {
            disciplineList.push(this.discipline);
            this.rowCount++;
            $("#modalWindow").modal('hide');
        });
    }

    editRow(discipline: Discipline){
        this.facultiesList.forEach(function (item) {
            if(item.label === discipline.Faculty.Name){
                discipline.Faculty = item.value
            }
        });
        this.discipline = discipline;
        this.discipline.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.disciplineBeforeChanges = discipline;
        this.isAddRow = false;
        this.modalHeader = "Изменить запись";
        $("#modalWindow").modal('show');
    }

    editRowSave(){
        let disciplineList = this.disciplineList;
        this.discipline.UpdatedDate = new Date();
        this.disciplineService.update(this.discipline).subscribe(() => {
            let index = disciplineList.lastIndexOf(this.disciplineBeforeChanges);
            disciplineList[index] = this.discipline;
            $("#modalWindow").modal('hide');
        });
    }

    deleteRow(discipline: Discipline){
        let disciplineList = this.disciplineList;
        this.disciplineService.delete(discipline.DisciplineId).subscribe(() => {
            let index = disciplineList.lastIndexOf(discipline);
            disciplineList.splice(index , 1);
            this.rowCount--;
        });
    }

}
