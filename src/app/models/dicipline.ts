import {Faculty} from "./faculty";
export class Discipline {

    public DisciplineId: string;
    public Name: string;
    public ShortName: string;
    public Faculty: Faculty;
    public StatusDiscipline: string;

    public WhoUpdate: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;

    constructor() {

    }
}
