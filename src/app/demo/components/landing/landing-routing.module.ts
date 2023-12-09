import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { NewsComponent } from './news/news.component';
import { TheoryComponent } from './theory/theory.component';
import { SimulationsComponent } from './simulations/simulations.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LandingComponent },
        { path: 'news', component: NewsComponent },
        { path: 'theory', component: TheoryComponent },
        { path: 'simulations', component: SimulationsComponent }
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
