/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { YTestModule } from '../../../test.module';
import { HouseMySuffixDetailComponent } from 'app/entities/house-my-suffix/house-my-suffix-detail.component';
import { HouseMySuffix } from 'app/shared/model/house-my-suffix.model';

describe('Component Tests', () => {
    describe('HouseMySuffix Management Detail Component', () => {
        let comp: HouseMySuffixDetailComponent;
        let fixture: ComponentFixture<HouseMySuffixDetailComponent>;
        const route = ({ data: of({ house: new HouseMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YTestModule],
                declarations: [HouseMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HouseMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HouseMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.house).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
