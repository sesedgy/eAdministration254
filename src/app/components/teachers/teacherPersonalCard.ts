import {Component, OnInit, OnDestroy} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/api/user.service";
import {Response} from "@angular/http";
import {CookieService} from "../../services/cookie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {GuidService} from "../../services/guid.service";
import {Teacher} from "../../models/teacher";
import {TeacherService} from "../../services/api/teacher.service";
import {Faculty} from "../../models/faculty";
import {FacultyService} from "../../services/api/faculty.service";
import {SelectItem} from "primeng/components/common/api";
import {unescape} from "querystring";
import {FileService} from "../../services/api/file.service";
import {NotifyService} from "../../services/notify.service";
declare let $: any;

@Component({
    selector: 'teacher-personal-card',
    templateUrl: './../../views/teachers/teacher_personal_card.html'
})

export class TeacherPersonalCardComponent implements OnInit, OnDestroy{

    //Основные данные из БД
    private teacherId: string;
    private teacher: Teacher;
    private user: User;
    private photoSrc: string; //TODO
    private dataWorkVolumeChart: any;
    private teacherWorksList: any[];
    private teacherWorkSumm: number;
    //Справочники
    private facultiesList: SelectItem[];
    private academicDegreeList: SelectItem[];
    private academicTitleList: SelectItem[];
    //Для работы логики страницы
    private subscription: Subscription;
    private isPasswordsSame: boolean;
    private isChangeEmail: boolean;
    private isCreateNew: boolean = false;
    //Другое
    private userName: string;
    private email: string;
    private name: string;
    private newPassword: string;

    constructor(private userService: UserService,
                private teacherService: TeacherService,
                private facultyService: FacultyService,
                private fileService: FileService,
                private notifyService: NotifyService,
                private cookieService: CookieService,
                private guidService: GuidService,
                private activatedRoute: ActivatedRoute,
                private router: Router)
    {
        this.subscription = activatedRoute.params.subscribe(params=>this.teacherId=params['id']);
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    ngOnInit(){
        this.teacher = new Teacher();
        this.teacher.Faculty = new Faculty();
        this.academicDegreeList = [{label: "", value: null}, {label: 'Кандидат наук', value: 'Кандидат наук'}, {label: 'Доктор наук', value: 'Доктор наук'}];
        this.academicTitleList = [{label: "", value: null}, {label: 'Доцент', value: 'Доцент'}, {label: 'Профессор', value: 'Профессор'}];
        $('.input-mask-phone').mask('+7(999)999-99-99');

        $.fn.editable.defaults.mode = 'inline';
        $.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
        $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
            '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';


        if(this.teacherId === 'new'){
            this.isCreateNew = true;
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
        }else {
            this.notifyService.showLoading();
            this.teacherService.get(this.teacherId).subscribe((response:Response) => {
                if (response != null) {
                    this.teacher = response.json();
                    this.name = this.teacher.LastName + " " + this.teacher.FirstName.substring(0, 1) + ".";
                    if(this.teacher.MiddleName != null){
                        this.name = this.name + this.teacher.MiddleName.substring(0, 1) + ".";
                    }
                    let teacherFaculty = this.teacher.Faculty;
                    let newTeacherFaculty = null;

                    if(this.teacher.PhotoPath !== null || this.teacher.PhotoPath !== undefined) {
                        this.fileService.getImage(this.teacher.PhotoPath).subscribe((response: Response) => {
                            let fileType = "";
                            switch (this.teacher.PhotoPath.substring(this.teacher.PhotoPath.length - 3)) {
                                case "jpg":
                                    fileType = "data:image/jpeg;base64,";
                                    break;
                                case "png":
                                    fileType = "data:image/png;base64,";
                                    break;
                                case "gif":
                                    fileType = "data:image/gif;base64,";
                                    break;
                            }
                            this.photoSrc = fileType + response.text();
                        });
                    }
                    this.facultyService.getAll().subscribe((response:Response) => {
                        let facultiesList = [];
                        this.facultiesList = facultiesList;
                        facultiesList.push({label: "", value: null});
                        if (response != null) {
                            let responseJson = response.json();
                            responseJson.forEach(function (item) {
                                facultiesList.push({label: item.Name, value: item});

                                if(teacherFaculty.FacultyId === item.FacultyId){
                                    newTeacherFaculty = item;
                                }

                            });
                        }
                        this.facultiesList = facultiesList;
                        this.teacher.Faculty = newTeacherFaculty;
                    });
                    this.userService.getUserInfo(this.teacher.User.Login).subscribe((response: Response) => {
                        if (response != null) {
                            let responseBody = response.json();
                            this.userName = responseBody[0];
                            this.email = responseBody[1];
                        }
                    });
                    this.teacherService.getTeachersWorks(this.teacherId).subscribe((response:Response) => {
                        let teachersWork2 = response.json();
                        let finalList = [];
                        let flag = true;
                        teachersWork2.forEach(function (item, index) {
                            let itemToPush = item;
                            itemToPush.HoursWork = +itemToPush.HoursWork;
                            itemToPush.TeachersTypesWork.PercentLoad = +itemToPush.TeachersTypesWork.PercentLoad;
                            flag = true;
                            finalList.forEach(function (item2) {
                                if (item.TeachersTypesWork.Name === item2.TeachersTypesWork.Name) {
                                    flag = false;
                                }
                            });
                            if (flag && index + 1 != teachersWork2.length) { //тут возможна ошибка
                                for(let i = index + 1; i < teachersWork2.length; i++){
                                    if (item.TeachersTypesWork.Name === teachersWork2[i].TeachersTypesWork.Name) {
                                        itemToPush.HoursWork += +teachersWork2[i].HoursWork;
                                    }
                                }
                                finalList.push(itemToPush);
                            }
                        });
                        let finalSumm = 0;
                        finalList.forEach(function (item) {
                            finalSumm += item.HoursWork * item.TeachersTypesWork.PercentLoad;
                        });
                        this.teacherWorkSumm = finalSumm;
                        this.teacherWorksList = finalList;
                        this.notifyService.stopShowLoading();
                    });
                }
            });
        }

        //PHOTO

        let thisClass = this;
        let last_gritter;
        $('#avatar').editable({
            type: 'image',
            name: 'avatar',
            value: null,
            //onblur: 'ignore',  //don't reset or hide editable onblur?!
            image: {
                //specify ace file input plugin's options here
                btn_choose: 'Изменить фото',
                droppable: false,
                maxSize: 110000,//~100Kb

                //and a few extra ones here
                name: 'avatar',//put the field name here as well, will be used inside the custom plugin
                on_error : function(error_type) {//on_error function will be called when the selected file has a problem
                    if(last_gritter) $.gritter.remove(last_gritter);
                    if(error_type == 1) {//file format error
                        last_gritter = $.gritter.add({
                            title: 'Файл не является изображением',
                            text: 'Пожалуйста выберите jpg|gif|png файл!',
                            class_name: 'gritter-error gritter-center'
                        });
                    } else if(error_type == 2) {//file size error
                        last_gritter = $.gritter.add({
                            title: 'Файл слишком большой!',
                            text: 'Размер изображения не должен превышать 100Kb',
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                    else {//other error
                    }
                },
                on_success : function() {
                    $.gritter.removeAll();
                }
            },
            url: function() {
                //get base64
                let thumb = $('#avatar').next().find('img').data('thumb');

                //Convert base64 to image
                let byteString;
                if (thumb.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(thumb.split(',')[1]);
                else
                    byteString = unescape(thumb.split(',')[1]);
                var mimeString = thumb.split(',')[0].split(':')[1].split(';')[0];
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                let blob = new Blob([ia], {type:mimeString});

                //Create file
                let file = new File([blob], thisClass.teacherId + ".png");

                let formData = new FormData();
                formData.append("file", file);
                thisClass.teacherService.uploadPhoto(formData).subscribe(() => {
                    $.gritter.add({
                        title: 'Фотография загружена',
                        text: 'Данные успешно сохранены',
                        class_name: 'gritter-success'
                    });
                });

                if(thumb) $('#avatar').get(0).src = thumb;

                // ***END OF UPDATE AVATAR HERE*** //
            }
        });
    }

    saveChanges(){
        let facultyId = this.teacher.Faculty.FacultyId;
        this.teacher.Faculty = new Faculty();
        this.teacher.Faculty.FacultyId = facultyId;
        this.teacherService.update(this.teacher).subscribe((response:Response) =>
        {
            if(response.status === 200) {
                this.ngOnInit();
                $.gritter.add({
                    title: 'Сохранение завершено',
                    text: 'Данные успешно изменены',
                    class_name: 'gritter-success'
                });
            }
        });
    }

    createNew(){
        this.teacher.TeacherId = this.guidService.createGuid();
        this.teacher.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.teacher.CreatedDate = new Date();

        this.user = new User();
        this.user.Email = this.email;
        this.user.Login = this.userName;
        this.user.Password = this.newPassword;
        this.user.Role = "IsTeacher";
        this.user.UserId = this.guidService.createGuid();
        this.user.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.user.CreatedDate = new Date();

        this.teacher.User = this.user;

        this.teacherService.create(this.teacher).subscribe(() => {
            $.gritter.add({
                title: 'Добавление завершено',
                text: 'Преподаватель успешно добавлен',
                class_name: 'gritter-success'
            });
            this.router.navigate(['teachers']);
        });

    }

    deleteRecord(){
        this.teacherService.delete(this.teacher.TeacherId, this.teacher.User.UserId).subscribe((response:Response) =>
        {
            if(response.status === 200) {
                $.gritter.add({
                    title: 'Удаление завершено',
                    text: 'Преподаватель успешно удален',
                    class_name: 'gritter-success'
                });
                this.router.navigate(['teachers']);
            }
        });
    }

}