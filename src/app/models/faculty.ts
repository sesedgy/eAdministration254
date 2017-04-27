import {Discipline} from "./dicipline";

export class Faculty {
    public FacultyId: string;
    public Name: string;

    public Disciplines: Array<Discipline>;
    public Teachers: Array<any>;

    public WhoUpdate: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;

    constructor() {

    }
}
