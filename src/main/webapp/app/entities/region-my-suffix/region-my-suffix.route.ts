import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from './region-my-suffix.service';
import { RegionMySuffixComponent } from './region-my-suffix.component';
import { RegionMySuffixDetailComponent } from './region-my-suffix-detail.component';
import { RegionMySuffixUpdateComponent } from './region-my-suffix-update.component';
import { RegionMySuffixDeletePopupComponent } from './region-my-suffix-delete-dialog.component';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class RegionMySuffixResolve implements Resolve<IRegionMySuffix> {
    constructor(private service: RegionMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((region: HttpResponse<RegionMySuffix>) => region.body));
        }
        return of(new RegionMySuffix());
    }
}

export const regionRoute: Routes = [
    {
        path: 'region-my-suffix',
        component: RegionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'region-my-suffix/:id/view',
        component: RegionMySuffixDetailComponent,
        resolve: {
            region: RegionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'region-my-suffix/new',
        component: RegionMySuffixUpdateComponent,
        resolve: {
            region: RegionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'region-my-suffix/:id/edit',
        component: RegionMySuffixUpdateComponent,
        resolve: {
            region: RegionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regionPopupRoute: Routes = [
    {
        path: 'region-my-suffix/:id/delete',
        component: RegionMySuffixDeletePopupComponent,
        resolve: {
            region: RegionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Regions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
