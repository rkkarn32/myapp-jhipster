import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YSharedModule } from 'app/shared';
import {
    TaskMySuffixComponent,
    TaskMySuffixDetailComponent,
    TaskMySuffixUpdateComponent,
    TaskMySuffixDeletePopupComponent,
    TaskMySuffixDeleteDialogComponent,
    taskRoute,
    taskPopupRoute
} from './';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
    imports: [YSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskMySuffixComponent,
        TaskMySuffixDetailComponent,
        TaskMySuffixUpdateComponent,
        TaskMySuffixDeleteDialogComponent,
        TaskMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TaskMySuffixComponent,
        TaskMySuffixUpdateComponent,
        TaskMySuffixDeleteDialogComponent,
        TaskMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YTaskMySuffixModule {}
