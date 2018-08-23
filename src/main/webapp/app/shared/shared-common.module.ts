import { NgModule } from '@angular/core';

import { YSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [YSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [YSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class YSharedCommonModule {}
