import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHouseMySuffix } from 'app/shared/model/house-my-suffix.model';
import { HouseMySuffixService } from './house-my-suffix.service';

@Component({
    selector: 'jhi-house-my-suffix-delete-dialog',
    templateUrl: './house-my-suffix-delete-dialog.component.html'
})
export class HouseMySuffixDeleteDialogComponent {
    house: IHouseMySuffix;

    constructor(private houseService: HouseMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.houseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'houseListModification',
                content: 'Deleted an house'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-house-my-suffix-delete-popup',
    template: ''
})
export class HouseMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ house }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HouseMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.house = house;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
