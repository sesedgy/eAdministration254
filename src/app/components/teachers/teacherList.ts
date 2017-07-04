import {Component, OnInit, ViewChild} from "@angular/core";
import {Response} from "@angular/http";
import {SelectItem} from "primeng/components/common/api";
import {Router} from "@angular/router";
import {TeacherService} from "../../services/api/teacher.service";
import {Teacher} from "../../models/teacher";
import {FacultyService} from "../../services/api/faculty.service";
import {FileUploader} from "ng2-file-upload";
import {CookieService} from "../../services/cookie.service";
declare let $:any;

@Component({
    selector: 'teachers_list',
    templateUrl: './../../views/teachers/teachers_list.html',

})

export class TeachersListComponent implements OnInit{

    constructor(private teacherService: TeacherService,
                private facultyService: FacultyService,
                private cookieService: CookieService,
                private router: Router){}

    private teachersList: Teacher[];
    private facultiesList: SelectItem[];
    private academicDegreeList: SelectItem[];
    private academicTitleList: SelectItem[];
    private uploader: FileUploader;
    private workVolumeDoc: File;
    private groupTeacherDoc: File;
    private rowCount: number;


    ngOnInit(){
        this.uploader = new FileUploader({url: "http://localhost:53753/api/teachers/uploadWorkVolume/", authToken: this.cookieService.getTokenId(), disableMultipart: true});
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
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

        $('.uploadData').ace_file_input({
            no_file:'Файл не выбран ...',
            btn_choose:'Выбрать',
            btn_change:'Изменить',
            droppable:false,
            onchange:null,
            thumbnail:false
        });

        $('#uploader').on('change', function(e){
            let file = this.files[0];
            console.log(file);
        })
    }

    addRow(){
        this.router.navigate(['teachers', 'new']);
    }

    dataImport(){
        $("#modalWindowImport").modal('show');
    }

    workVolumeDocUpload(event){
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.workVolumeDoc = fileList[0];
        }
    }

    groupTeacherDocUpload(event){
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.groupTeacherDoc = fileList[0];
        }
    }

    importWorkVolume(){
        let files = new FormData();
        // files.append("uploads[]", this.workVolumeDoc, this.workVolumeDoc.name);
        files.append("files", this.workVolumeDoc);
        files.append("files", this.groupTeacherDoc);
        // files.append("files", this.groupTeacherDoc, this.groupTeacherDoc.name);
        // this.teacherService.uploadWorkVolume(files).subscribe(() => {
        this.teacherService.uploadWorkVolume(files).subscribe(() => {
            $.gritter.add({
                title: 'Сохранение завершено',
                text: 'Данные успешно удалены',
                class_name: 'gritter-success'
            });
        });
    }

    // importWorkVolume(){
    //     let token = this.cookieService.getTokenId();
    //     let file = new FormData();
    //     file.append("file", this.workVolumeDoc);
    //
    //
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("POST", "http://localhost:53753/api/teachers/uploadWorkVolume");
    //     // xhr.setRequestHeader('Content-Type', 'application/vnd.ms-excel');
    //
    //     xhr.onreadystatechange = function() {
    //     };
    //
    //     xhr.send(file);
    //     // $.post({
    //     //     url: "http://localhost:53753/api/teachers/uploadWorkVolume",
    //     //     method: "POST",
    //     //     data: file,
    //     //     beforeSend: function (xhr) {
    //     //         xhr.setRequestHeader('Authorization', token);
    //     //     }
    //     // }).done(function(){
    //     //     alert('PUK');
    //     // });
    //     // let files = new FormData();
    //     // // files.append("uploads[]", this.workVolumeDoc, this.workVolumeDoc.name);
    //     // files.append("file", this.workVolumeDoc, this.workVolumeDoc.name);
    //     // console.log(this.workVolumeDoc);
    //     // // files.append("files", this.groupTeacherDoc, this.groupTeacherDoc.name);
    //     // // this.teacherService.uploadWorkVolume(files).subscribe(() => {
    //     // this.teacherService.uploadWorkVolume(this.workVolumeDoc).subscribe(() => {
    //     //     $.gritter.add({
    //     //         title: 'Сохранение завершено',
    //     //         text: 'Данные успешно удалены',
    //     //         class_name: 'gritter-success'
    //     //     });
    //     // });
    // }


    handleFilter(dataTable){
        this.rowCount = dataTable.totalRecords;
    }


}
