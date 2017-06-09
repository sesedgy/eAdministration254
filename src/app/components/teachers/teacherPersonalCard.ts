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
    private photoSrc: string; //Todo
    //Справочники
    private facultiesList: Faculty[];
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

        if(this.teacherId === 'new'){
            this.isCreateNew = true;
            this.facultyService.getAll().subscribe((response:Response) => {
                let facultiesList = [];
                facultiesList.push({label: null, value: null});
                if (response != null) {
                    let responseJson = response.json();
                    responseJson.forEach(function (item) {
                        facultiesList.push({label: item.Name, value: item});
                    });
                }
                this.facultiesList = facultiesList;
            });
        }else {
            this.teacherService.get(this.teacherId).subscribe((response:Response) => {
                if (response != null) {
                    this.teacher = response.json();
                    this.name = this.teacher.LastName + " " + this.teacher.FirstName.substring(0, 1) + ".";
                    if(this.teacher.MiddleName != null){
                        this.name = this.name + this.teacher.MiddleName.substring(0, 1) + ".";
                    }
                    this.photoSrc = this.teacher.PhotoPath;
                    let teacherFaculty = this.teacher.Faculty;
                    let newTeacherFaculty = null;

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

                    // let last_gritter;
                    // $('#avatar').editable({
                    //     type: 'image',
                    //     name: 'avatar',
                    //     value: null,
                    //     //onblur: 'ignore',  //don't reset or hide editable onblur?!
                    //     image: {
                    //         //specify ace file input plugin's options here
                    //         btn_choose: 'Change Avatar',
                    //         droppable: true,
                    //         maxSize: 110000,//~100Kb
                    //
                    //         //and a few extra ones here
                    //         name: 'avatar',//put the field name here as well, will be used inside the custom plugin
                    //         on_error : function(error_type) {//on_error function will be called when the selected file has a problem
                    //             if(last_gritter) $.gritter.remove(last_gritter);
                    //             if(error_type == 1) {//file format error
                    //                 last_gritter = $.gritter.add({
                    //                     title: 'File is not an image!',
                    //                     text: 'Please choose a jpg|gif|png image!',
                    //                     class_name: 'gritter-error gritter-center'
                    //                 });
                    //             } else if(error_type == 2) {//file size rror
                    //                 last_gritter = $.gritter.add({
                    //                     title: 'File too big!',
                    //                     text: 'Image size should not exceed 100Kb!',
                    //                     class_name: 'gritter-error gritter-center'
                    //                 });
                    //             }
                    //             else {//other error
                    //             }
                    //         },
                    //         on_success : function() {
                    //             $.gritter.removeAll();
                    //         }
                    //     },
                    //     url: function(params) {
                    //         // ***UPDATE AVATAR HERE*** //
                    //         //for a working upload example you can replace the contents of this function with
                    //         //examples/profile-avatar-update.js
                    //
                    //         var deferred = new $.Deferred
                    //
                    //         var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
                    //         if(!value || value.length == 0) {
                    //             deferred.resolve();
                    //             return deferred.promise();
                    //         }
                    //
                    //
                    //         //dummy upload
                    //         setTimeout(function(){
                    //             if("FileReader" in window) {
                    //                 //for browsers that have a thumbnail of selected image
                    //                 var thumb = $('#avatar').next().find('img').data('thumb');
                    //                 if(thumb) $('#avatar').get(0).src = thumb;
                    //             }
                    //
                    //             deferred.resolve({'status':'OK'});
                    //
                    //             if(last_gritter) $.gritter.remove(last_gritter);
                    //             last_gritter = $.gritter.add({
                    //                 title: 'Avatar Updated!',
                    //                 text: 'Uploading to server can be easily implemented. A working example is included with the template.',
                    //                 class_name: 'gritter-info gritter-center'
                    //             });
                    //
                    //         } , parseInt(Math.random() * 800 + 800))
                    //
                    //         return deferred.promise();
                    //
                    //         // ***END OF UPDATE AVATAR HERE*** //
                    //     },
                    //
                    //     success: function(response, newValue) {
                    //     }
                    // })
                }
            });
        }
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
    // changeEmail(){
    //     this.userService.isLoginAndEmailFree(null, this.email).subscribe((response:Response) =>
    //     {
    //         if(response.json()[1]) {
    //             this.userService.changeEmail(this.userName, this.email).subscribe((response: Response) => {
    //                 if (response.status === 200) {
    //                     $.gritter.add({
    //                         title: 'Сохранение завершено',
    //                         text: 'Ваш email успешно изменен',
    //                         class_name: 'gritter-success'
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }
    // changeLogin(){
    //     this.userService.isLoginAndEmailFree(this.userName, null).subscribe((response:Response) =>
    //     {
    //         if(response.json()[0]) {
    //             this.userService.changeLogin(this.email, this.userName).subscribe((response: Response) => {
    //                 if (response.status === 200) {
    //                     $.gritter.add({
    //                         title: 'Сохранение завершено',
    //                         text: 'Ваш логин успешно изменен',
    //                         class_name: 'gritter-success'
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }
    // changePassword(){
    //     if(this.newPassword === this.newPasswordRepeat) {
    //         this.isPasswordsSame = false;
    //         this.userService.changePassword(this.userName, this.newPassword).subscribe((response: Response) => {
    //             if(response.status === 200) {
    //                 $.gritter.add({
    //                     title: 'Сохранение завершено',
    //                     text: 'Ваш пароль успешно изменен',
    //                     class_name: 'gritter-success'
    //                 });
    //             }
    //         });
    //     }else{
    //         this.isPasswordsSame = true;
    //     }
    // }

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