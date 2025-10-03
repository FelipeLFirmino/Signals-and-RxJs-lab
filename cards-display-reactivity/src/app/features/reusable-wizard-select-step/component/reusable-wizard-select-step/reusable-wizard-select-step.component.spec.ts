import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableWizardSelectStepComponent } from './reusable-wizard-select-step.component';

describe('ReusableWizardSelectStepComponent', () => {
  let component: ReusableWizardSelectStepComponent;
  let fixture: ComponentFixture<ReusableWizardSelectStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableWizardSelectStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableWizardSelectStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
