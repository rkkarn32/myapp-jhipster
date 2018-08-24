export interface IHouseMySuffix {
    id?: number;
    houseNum?: number;
    name?: string;
    employeeId?: number;
}

export class HouseMySuffix implements IHouseMySuffix {
    constructor(public id?: number, public houseNum?: number, public name?: string, public employeeId?: number) {}
}
