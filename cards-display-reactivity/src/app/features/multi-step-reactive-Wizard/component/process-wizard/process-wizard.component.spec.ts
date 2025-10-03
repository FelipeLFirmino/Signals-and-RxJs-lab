import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWizardComponent } from './process-wizard.component';

describe('ProcessWizardComponent', () => {
  let component: ProcessWizardComponent;
  let fixture: ComponentFixture<ProcessWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
