import {Specialty} from "./specialty";
import {TeachersWork} from "./teachersWork";
import {Student} from "./student";

export class Group{

    public GroupId: string;
    public Name: string;
    public Specialty: Specialty;
    public Students: Student[];
    public Semester: string;
    public Status: string;
    public Begin: Date;
    public TeachersWorks: TeachersWork[];

    public WhoUpdate: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;

    constructor() {

    }

}
