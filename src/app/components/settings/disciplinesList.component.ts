import {Component, OnInit} from "@angular/core";
import {DisciplineService} from "../../services/api/discipline.service";
import {Response} from "@angular/http";
import {Discipline} from "../../models/dicipline";
import {GuidService} from "../../services/guid.service";
import {CookieService} from "../../services/cookie.service";
import {FacultyService} from "../../services/api/faculty.service";
import {SelectItem} from "primeng/components/common/api";
import {Faculty} from "../../models/faculty";
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
        this.discipline.CreatedDate = new Date();
        this.disciplineService.create(this.discipline).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно добавлены',
                class_name: 'gritter-success'
            });
            $("#modalWindow").modal('hide');
            this.ngOnInit();
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
        this.isAddRow = false;
        this.modalHeader = "Изменить запись";
        $("#modalWindow").modal('show');
    }

    editRowSave(){
        this.discipline.UpdatedDate = new Date();
        let facultyId = this.discipline.Faculty.FacultyId;
        this.discipline.Faculty = new Faculty();
        this.discipline.Faculty.FacultyId = facultyId;
        this.disciplineService.update(this.discipline).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно изменены',
                class_name: 'gritter-success'
            });
            $("#modalWindow").modal('hide');
            this.ngOnInit();
        });
    }

    deleteRow(discipline: Discipline){
        this.disciplineService.delete(discipline.DisciplineId).subscribe(() => {
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
