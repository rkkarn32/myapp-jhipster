/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YTestModule } from '../../../test.module';
import { HouseMySuffixUpdateComponent } from 'app/entities/house-my-suffix/house-my-suffix-update.component';
import { HouseMySuffixService } from 'app/entities/house-my-suffix/house-my-suffix.service';
import { HouseMySuffix } from 'app/shared/model/house-my-suffix.model';

describe('Component Tests', () => {
    describe('HouseMySuffix Management Update Component', () => {
        let comp: HouseMySuffixUpdateComponent;
        let fixture: ComponentFixture<HouseMySuffixUpdateComponent>;
        let service: HouseMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YTestModule],
                declarations: [HouseMySuffixUpdateComponent]
            })
                .overrideTemplate(HouseMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HouseMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HouseMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HouseMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.house = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HouseMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.house = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
