import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HouseMySuffix } from 'app/shared/model/house-my-suffix.model';
import { HouseMySuffixService } from './house-my-suffix.service';
import { HouseMySuffixComponent } from './house-my-suffix.component';
import { HouseMySuffixDetailComponent } from './house-my-suffix-detail.component';
import { HouseMySuffixUpdateComponent } from './house-my-suffix-update.component';
import { HouseMySuffixDeletePopupComponent } from './house-my-suffix-delete-dialog.component';
import { IHouseMySuffix } from 'app/shared/model/house-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class HouseMySuffixResolve implements Resolve<IHouseMySuffix> {
    constructor(private service: HouseMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((house: HttpResponse<HouseMySuffix>) => house.body));
        }
        return of(new HouseMySuffix());
    }
}

export const houseRoute: Routes = [
    {
        path: 'house-my-suffix',
        component: HouseMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-my-suffix/:id/view',
        component: HouseMySuffixDetailComponent,
        resolve: {
            house: HouseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-my-suffix/new',
        component: HouseMySuffixUpdateComponent,
        resolve: {
            house: HouseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'house-my-suffix/:id/edit',
        component: HouseMySuffixUpdateComponent,
        resolve: {
            house: HouseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const housePopupRoute: Routes = [
    {
        path: 'house-my-suffix/:id/delete',
        component: HouseMySuffixDeletePopupComponent,
        resolve: {
            house: HouseMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
