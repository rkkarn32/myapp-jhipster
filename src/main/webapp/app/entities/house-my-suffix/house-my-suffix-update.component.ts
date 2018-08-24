import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHouseMySuffix } from 'app/shared/model/house-my-suffix.model';
import { HouseMySuffixService } from './house-my-suffix.service';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix';

@Component({
    selector: 'jhi-house-my-suffix-update',
    templateUrl: './house-my-suffix-update.component.html'
})
export class HouseMySuffixUpdateComponent implements OnInit {
    private _house: IHouseMySuffix;
    isSaving: boolean;

    employees: IEmployeeMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private houseService: HouseMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ house }) => {
            this.house = house;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeMySuffix[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.house.id !== undefined) {
            this.subscribeToSaveResponse(this.houseService.update(this.house));
        } else {
            this.subscribeToSaveResponse(this.houseService.create(this.house));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHouseMySuffix>>) {
        result.subscribe((res: HttpResponse<IHouseMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEmployeeById(index: number, item: IEmployeeMySuffix) {
        return item.id;
    }
    get house() {
        return this._house;
    }

    set house(house: IHouseMySuffix) {
        this._house = house;
    }
}
