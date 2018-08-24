/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { YTestModule } from '../../../test.module';
import { HouseMySuffixComponent } from 'app/entities/house-my-suffix/house-my-suffix.component';
import { HouseMySuffixService } from 'app/entities/house-my-suffix/house-my-suffix.service';
import { HouseMySuffix } from 'app/shared/model/house-my-suffix.model';

describe('Component Tests', () => {
    describe('HouseMySuffix Management Component', () => {
        let comp: HouseMySuffixComponent;
        let fixture: ComponentFixture<HouseMySuffixComponent>;
        let service: HouseMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YTestModule],
                declarations: [HouseMySuffixComponent],
                providers: []
            })
                .overrideTemplate(HouseMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HouseMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.houses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
