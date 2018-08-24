import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHouseMySuffix } from 'app/shared/model/house-my-suffix.model';
import { Principal } from 'app/core';
import { HouseMySuffixService } from './house-my-suffix.service';

@Component({
    selector: 'jhi-house-my-suffix',
    templateUrl: './house-my-suffix.component.html'
})
export class HouseMySuffixComponent implements OnInit, OnDestroy {
    houses: IHouseMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private houseService: HouseMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.houseService.query().subscribe(
            (res: HttpResponse<IHouseMySuffix[]>) => {
                this.houses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHouses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHouseMySuffix) {
        return item.id;
    }

    registerChangeInHouses() {
        this.eventSubscriber = this.eventManager.subscribe('houseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
