import { Moment } from 'moment';
import { IHouseMySuffix } from 'app/shared/model//house-my-suffix.model';
import { IJobMySuffix } from 'app/shared/model//job-my-suffix.model';

export interface IEmployeeMySuffix {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    hireDate?: Moment;
    salary?: number;
    commissionPct?: number;
    departmentId?: number;
    houseNums?: IHouseMySuffix[];
    jobs?: IJobMySuffix[];
    managerId?: number;
}

export class EmployeeMySuffix implements IEmployeeMySuffix {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public hireDate?: Moment,
        public salary?: number,
        public commissionPct?: number,
        public departmentId?: number,
        public houseNums?: IHouseMySuffix[],
        public jobs?: IJobMySuffix[],
        public managerId?: number
    ) {}
}
