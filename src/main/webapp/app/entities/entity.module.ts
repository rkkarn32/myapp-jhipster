import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { YRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { YHouseMySuffixModule } from './house-my-suffix/house-my-suffix.module';
import { YCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { YLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { YDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { YTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { YEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { YJobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { YJobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        YRegionMySuffixModule,
        YHouseMySuffixModule,
        YCountryMySuffixModule,
        YLocationMySuffixModule,
        YDepartmentMySuffixModule,
        YTaskMySuffixModule,
        YEmployeeMySuffixModule,
        YJobMySuffixModule,
        YJobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YEntityModule {}
