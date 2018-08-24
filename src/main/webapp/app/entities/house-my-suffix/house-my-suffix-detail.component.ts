import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHouseMySuffix } from 'app/shared/model/house-my-suffix.model';

@Component({
    selector: 'jhi-house-my-suffix-detail',
    templateUrl: './house-my-suffix-detail.component.html'
})
export class HouseMySuffixDetailComponent implements OnInit {
    house: IHouseMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ house }) => {
            this.house = house;
        });
    }

    previousState() {
        window.history.back();
    }
}
