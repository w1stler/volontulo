import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs/Subject';

import { CreateOfferComponent } from 'app/components/offers/create-offer/create-offer.component';
import { AuthService } from 'app/services/auth.service';
import { OffersService } from 'app/services/offers.service';

describe('CreateOfferComponent', () => {
  let component: CreateOfferComponent;
  let fixture: ComponentFixture<CreateOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ CreateOfferComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: new Subject()
          },
        },
      {
        provide: AuthService,
        useValue: {
          user$: new Subject(),
        }
      },
      {
        provide: OffersService,
        useValue: {},
      }
    ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  describe('actionStartDate and actionEndDate validation', () => {
    it('should set invalid status when actionStartDate and actionOngoing are filled', () => {
      component.form.patchValue({
        actionStartDate: '2010/05/10',
        actionOngoing: true,
      });

      expect(component.form.errors.hasOwnProperty('actionStartDateError')).toBe(true);
      expect(component.form.errors.actionStartDateError).toBe(true);
    });

    it('should set invalid status when actionEndDate and constantCoop are filled', () => {
      component.form.patchValue({
        actionEndDate: '2010/05/10',
        constantCoop: true,
      });

      expect(component.form.valid).toBe(false);
    });

    it('shouldn\'t set invalid status when actionStartDate and constantCoop are filled', () => {
      component.form.patchValue({
        actionStartDate: '2010/05/10',
        constantCoop: true,
      });

      expect(component.form.errors).toBeNull();
    });

    it('shouldn\'t set invalid status when actionEndDate and actionOngoing are filled', () => {
      component.form.patchValue({
        actionEndDate: '2010/05/10',
        actionOngoing: true,
      });

      expect(component.form.errors).toBeNull();
    });

    it('should display error message if actionStartDate and actionOngoing are invalid', () => {
      component.form.patchValue({
        actionStartDate: '2010/03/02',
        actionEndDate: '2010/05/10',
        actionOngoing: true,
        constantCoop: true,
      });
      component.hasOrganization = true;
      fixture.detectChanges();

      const erroractionEndDateElem = fixture.debugElement.query(By.css('.actionEndDate .errors span'));
      const erroractionStartDateElem = fixture.debugElement.query(By.css('.actionStartDate .errors span'));
      expect(erroractionEndDateElem).not.toBeNull();
      expect(erroractionEndDateElem.nativeElement.innerText).toContain('nie podawaj daty');
      expect(erroractionStartDateElem).not.toBeNull();
      expect(erroractionStartDateElem.nativeElement.innerText).toContain('nie podawaj daty');
    });
  });
});
