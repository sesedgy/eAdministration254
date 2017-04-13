import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {FacultyService} from "../../services/api/faculty.service";
import {Faculty} from "../../models/faculty";
import {GuidService} from "../../services/guid.service";
// import {DataTableModule,SharedModule} from 'primeng/primeng';
declare let $:any;

@Component({
    selector: 'faculties',
    templateUrl: './../../views/settings/faculties_list.html'
})

export class FacultiesListComponent implements OnInit{

    private facultyList: Faculty[];
    private rowCount: number;
    private isAddUser: boolean;

    constructor(private facultyService: FacultyService,
                private guidService: GuidService){}

    ngOnInit(){
        this.facultyService.getAll().subscribe((response:Response) => {
            let responseBody = response.json();
            this.facultyList = responseBody;
            this.rowCount = this.facultyList.length;
        });

    }

    addRow(){

    }

    editRow(faculty: Faculty){

    }

    deleteRow(faculty: Faculty){
        this.facultyService.delete(faculty.id).subscribe((response:Response) => {
            this.facultyList.slice(this.facultyList.indexOf(faculty), 1);
            return;
        });
    }

}
