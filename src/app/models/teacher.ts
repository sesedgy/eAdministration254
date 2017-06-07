import {User} from "./user";
import {Faculty} from "./faculty";
import {TeachersWork} from "./teachersWork";

export class Teacher{

    public TeacherId: string;
    public User: User;
    public LastName: string;
    public FirstName: string;
    public MiddleName: string;
    public BirthDate: Date;
    public MobilePhone: string;
    public Citizenship: string;
    public Sex: string;
    public PassportSeries: string;
    public PassportNumber: string;
    public PassportDate: Date;
    public PassportIssueOrg: string;

    public CountryRegistration: string;
    public CityRegistration: string;
    public RegionRegistration: string;
    public DistrictRegistration: string;
    public LocalityRegistration: string;
    public StreetRegistration: string;
    public HouseRegistration: string;
    public BuildingRegistration: string;
    public HousingRegistration: string;
    public FlatRegistration: string;
    public IndexRegistration: string;

    public INN: string;
    public SNILS: string;
    public SeriesEducationDocument: string;
    public NumberEducationDocument: string;
    public DateEducationDocument: Date;
    public WhoGiveEducationDocument: string;

    public Faculty: Faculty;
    public Speciality: string;
    public AcademicDegree: string;
    public AcademicTitle: string;
    public BeginDate: Date;                         //Дата начала работы
    public EndDate: Date;

    public TeachersWorks: TeachersWork[];

    public SalaryPerHour: string;                   //Почасовая ставка
    public PhotoPath: string;
    public Status: string;

    public WhoUpdate: string;
    public CreatedDate: Date;
    public UpdatedDate: Date;

    constructor() {

    }


}
