import {Component, OnInit, OnDestroy} from "@angular/core";
import {Employee} from "../../models/employee";
import {User} from "../../models/user";
import {UserService} from "../../services/api/user.service";
import {Response} from "@angular/http";
import {EmployeeService} from "../../services/api/employee.service";
import {CookieService} from "../../services/cookie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {GuidService} from "../../services/guid.service";
import {DepartmentService} from "../../services/api/department.service";
import {Department} from "../../models/department";
declare let $: any;

@Component({
    selector: 'employee-personal-card',
    templateUrl: './../../views/employees/employee_personal_card.html'
})

export class EmployeePersonalCardComponent implements OnInit, OnDestroy{

    //Основные данные из БД
    private employeeId: string;
    private employee: Employee;
    private user: User;
    private photoSrc: string; //Todo
    //Справочники
    private departmentsList: Department[];
    //Для работы логики страницы
    private subscription: Subscription;
    private isPasswordsSame: boolean;
    private isChangeEmail: boolean;
    private isCreateNew: boolean = false;
    //Другое
    private userName: string;
    private email: string;
    private role: string;
    private name: string;
    private newPassword: string;
    private newPasswordRepeat: string;

    constructor(private userService: UserService,
                private employeeService: EmployeeService,
                private departmentService: DepartmentService,
                private cookieService: CookieService,
                private guidService: GuidService,
                private activatedRoute: ActivatedRoute,
                private router: Router)
    {
        this.subscription = activatedRoute.params.subscribe(params=>this.employeeId=params['id']);
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    ngOnInit(){
        this.employee = new Employee();
        this.employee.Department = new Department();
        $('.input-mask-phone').mask('+7(999)999-99-99');

        if(this.employeeId === 'new'){
            this.isCreateNew = true;
            this.departmentService.getAll().subscribe((response:Response) => {
                let departmentsList = [];
                departmentsList.push({label: null, value: null});
                if (response != null) {
                    let responseJson = response.json();
                    responseJson.forEach(function (item) {
                        departmentsList.push({label: item.Name, value: item});
                    });
                }
                this.departmentsList = departmentsList;
            });
        }else {
            this.employeeService.get(this.employeeId).subscribe((response:Response) => {
                if (response != null) {
                    this.employee = response.json();
                    this.name = this.employee.LastName + " " + this.employee.FirstName.substring(0, 1) + ".";
                    if(this.employee.MiddleName != null){
                        this.name = this.name + this.employee.MiddleName.substring(0, 1) + ".";
                    }
                    this.photoSrc = this.employee.PhotoPath;
                    let employeeDepartment = this.employee.Department;
                    let newEmployeeDepartment = null;

                    this.departmentService.getAll().subscribe((response:Response) => {
                        let departmentsList = [];
                        this.departmentsList = departmentsList;
                        departmentsList.push({label: "", value: null});
                        if (response != null) {
                            let responseJson = response.json();
                            responseJson.forEach(function (item) {
                                departmentsList.push({label: item.Name, value: item});

                                if(employeeDepartment.DepartmentId === item.DepartmentId){
                                    newEmployeeDepartment = item;
                                }

                            });
                        }
                        this.departmentsList = departmentsList;
                        this.employee.Department = newEmployeeDepartment;
                    });

                    this.userService.getUserInfo(this.employee.User.Login).subscribe((response: Response) => {
                        if (response != null) {
                            let responseBody = response.json();
                            this.userName = responseBody[0];
                            this.email = responseBody[1];
                            switch (responseBody[2]){
                                case "Абитуриент":
                                    this.role = "IsAbiturient";
                                    break;
                                case "Студент":
                                    this.role = "IsStudent";
                                    break;
                                case "Староста":
                                    this.role = "IsStudentLeader";
                                    break;
                                case "Преподаватель":
                                    this.role = "IsTeacher";
                                    break;
                                case "Сотрудник":
                                    this.role = "IsWorker";
                                    break;
                                case "Администратор":
                                    this.role = "IsAdmin";
                                    break;
                            }
                        }
                    });
                }
            });
        }
    }

    saveChanges(){
        let departmentId = this.employee.Department.DepartmentId;
        this.employee.Department = new Department();
        this.employee.Department.DepartmentId = departmentId;
        this.employeeService.update(this.employee).subscribe((response:Response) =>
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
        this.employee.EmployeeId = this.guidService.createGuid();
        this.employee.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.employee.CreatedDate = new Date();

        this.user = new User();
        this.user.Email = this.email;
        this.user.Login = this.userName;
        this.user.Password = this.newPassword;
        this.user.Role = this.role;
        this.user.UserId = this.guidService.createGuid();
        this.user.WhoUpdate = this.cookieService.getCurrentUserLogin();
        this.user.CreatedDate = new Date();

        this.employee.User = this.user;

        this.employeeService.create(this.employee).subscribe(() => {
            $.gritter.add({
                title: 'Добавление завершено',
                text: 'Сотрудник успешно добавлен',
                class_name: 'gritter-success'
            });
            this.router.navigate(['employees']);
        });

    }

    deleteRecord(){
        this.employeeService.delete(this.employee.EmployeeId, this.employee.User.UserId).subscribe((response:Response) =>
        {
            if(response.status === 200) {
                $.gritter.add({
                    title: 'Удаление завершено',
                    text: 'Сотрудник успешно удален',
                    class_name: 'gritter-success'
                });
                this.router.navigate(['employees']);
            }
        });
    }

}