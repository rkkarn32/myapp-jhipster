import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YSharedModule } from 'app/shared';
import {
    HouseMySuffixComponent,
    HouseMySuffixDetailComponent,
    HouseMySuffixUpdateComponent,
    HouseMySuffixDeletePopupComponent,
    HouseMySuffixDeleteDialogComponent,
    houseRoute,
    housePopupRoute
} from './';

const ENTITY_STATES = [...houseRoute, ...housePopupRoute];

@NgModule({
    imports: [YSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HouseMySuffixComponent,
        HouseMySuffixDetailComponent,
        HouseMySuffixUpdateComponent,
        HouseMySuffixDeleteDialogComponent,
        HouseMySuffixDeletePopupComponent
    ],
    entryComponents: [
        HouseMySuffixComponent,
        HouseMySuffixUpdateComponent,
        HouseMySuffixDeleteDialogComponent,
        HouseMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YHouseMySuffixModule {}
