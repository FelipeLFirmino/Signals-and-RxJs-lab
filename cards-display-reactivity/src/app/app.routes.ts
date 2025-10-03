import { Routes } from '@angular/router';
import { WizardComponent } from './features/wizard/component/wizard/wizard.component';
import { ProcessWizardComponent } from './features/multi-step-reactive-Wizard/component/process-wizard/process-wizard.component';

export const routes: Routes = [
    {
        path:'',
        component: WizardComponent
    
    },{
        path:'2',
        component: ProcessWizardComponent
    
    }

    
];
