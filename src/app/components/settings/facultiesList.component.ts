import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {FacultyService} from "../../services/api/faculty.service";
import {Faculty} from "../../models/faculty";
// import {DataTableModule,SharedModule} from 'primeng/primeng';
declare let $:any;

@Component({
    selector: 'faculties',
    templateUrl: './../../views/settings/faculties_list.html'
})

export class FacultiesListComponent implements OnInit{

    private facultyList: Faculty[];

    constructor(private facultyService: FacultyService){}

    ngOnInit(){
        this.facultyService.getAll().subscribe((response:Response) => {
            let responseBody = response.json();
            this.facultyList = responseBody;
        });

    }

    //TODO Модальное окно с данными из строки
    editLine(id: string){

    }

    deleteLine(id: string){
        this.facultyService.delete(id).subscribe((response:Response) => {
            let responseBody = response.json();
            this.facultyList = responseBody;
            return;
        });
        this.facultyService.getAll().subscribe((response:Response) => {
            let responseBody = response.json();
            this.facultyList = responseBody;
            $('#dynamic-table').DataTable({
                bAutoWidth: false,
                "aoColumns": [
                    null, null, {"bSortable": false }
                ],
                "aaSorting": [],
                "language": {
                    "processing": "Подождите...",
                    "search": "Поиск:",
                    "lengthMenu": "Показать _MENU_ записей",
                    "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                    "infoEmpty": "Записи с 0 до 0 из 0 записей",
                    "infoFiltered": "(отфильтровано из _MAX_ записей)",
                    "infoPostFix": "",
                    "loadingRecords": "Загрузка записей...",
                    "zeroRecords": "Записи отсутствуют.",
                    "emptyTable": "В таблице отсутствуют данные",
                    "paginate": {
                        "first": "Первая",
                        "previous": "Предыдущая",
                        "next": "Следующая",
                        "last": "Последняя"
                    },
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                },
            });
            return;
        });
    }

}
