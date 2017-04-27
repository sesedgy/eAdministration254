import {Employee} from "./employee";

export class Department{

    public DepartmentId: string;
    public Name: string;
    public Employees: Array<Employee>;

    public WhoUpdate: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;

    constructor() {

    }
}
