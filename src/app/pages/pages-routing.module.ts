import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NewsComponent } from './news/news.component';
import { TheoryComponent } from './theory/theory.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PagesComponent },
        { path: 'about', component: AboutComponent },
        { path: 'news', component: NewsComponent },
        { path: 'theory', component: TheoryComponent },
        { path: 'simulations', component: SimulationsComponent },
        { path: 'gallery', component: GalleryComponent }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
