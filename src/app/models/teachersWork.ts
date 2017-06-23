import {Teacher} from "./teacher";
import {Group} from "./group";
import {TeachersTypesWork} from "./teachersTypesWork";

export class TeachersWork{

    public TeachersWorkId: string;
    public Teacher: Teacher;
    public TeachersTypesWork: TeachersTypesWork;
    public Group: Group;
    public Curs: string;
    public Semester: Date;
    public HoursWork: number;

    public WhoUpdate: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;

    constructor() {

    }

}
