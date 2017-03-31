import {Component} from "@angular/core";
import {DisciplineService} from "../../services/api/discipline.service";
import {Response} from "@angular/http";
import {Discipline} from "../../models/dicipline";
declare let $:any;

@Component({
    selector: 'disciplines',
    templateUrl: './../../views/settings/disciplines_list.html'
})

export class DisciplinesListComponent{

    constructor(private disciplineService: DisciplineService){}
    private disciplineList: Discipline[];

    ngOnInit(){
        this.disciplineService.getAll().subscribe((response:Response) => {
            let responseBody = response.json();
            this.disciplineList = responseBody;
            return;
        });
        let myTable =
            $('#dynamic-table')
                .DataTable({
                    bAutoWidth: false,
                    "aoColumns": [
                        { "bSortable": false },
                        null, null,null, null, null,
                        { "bSortable": false }
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

                    select: {
                        style: 'multi'
                    }
                });


    }

}
