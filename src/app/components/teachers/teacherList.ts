import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {SelectItem} from "primeng/components/common/api";
import {DepartmentService} from "../../services/api/department.service";
import {Router} from "@angular/router";
import {TeacherService} from "../../services/api/teacher.service";
import {Teacher} from "../../models/teacher";
import {FacultyService} from "../../services/api/faculty.service";
declare let $:any;

@Component({
    selector: 'teachers_list',
    templateUrl: './../../views/teachers/teachers_list.html',

})

export class TeachersListComponent implements OnInit{

    constructor(private teacherService: TeacherService,
                private facultyService: FacultyService,
                private router: Router){}

    private teachersList: Teacher[];
    private facultiesList: SelectItem[];
    private academicDegreeList: SelectItem[];
    private academicTitleList: SelectItem[];
    private rowCount: number;


    ngOnInit(){
        this.teacherService.getAll().subscribe((response:Response) => {
            if(response != null) {
                this.teachersList = response.json();
                this.rowCount = this.teachersList.length;
            }
        });
        this.facultyService.getAll().subscribe((response:Response) => {
            let facultiesList = [];
            facultiesList.push({label: "", value: null});
            if (response != null) {
                let responseJson = response.json();
                responseJson.forEach(function (item) {
                    facultiesList.push({label: item.Name, value: item.Name});
                });
            }
            this.facultiesList = facultiesList;
        });
        this.academicDegreeList = [{label: "", value: null}, {label: 'Кандидат наук', value: 'Кандидат наук'}, {label: 'Доктор наук', value: 'Доктор наук'}];
        this.academicTitleList = [{label: "", value: null}, {label: 'Доцент', value: 'Доцент'}, {label: 'Профессор', value: 'Профессор'}];
    }

    addRow(){
        this.router.navigate(['teachers', 'new']);
    }

    handleFilter(dataTable){
        this.rowCount = dataTable.totalRecords;
    }
}
