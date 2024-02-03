import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CanvasBoxComponent } from '../components/canvas-box/canvas-box.component';
import { NewsComponent } from './news/news.component';
import { TheoryComponent } from './theory/theory.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SkeletonModule } from 'primeng/skeleton';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        SkeletonModule
    ],
    declarations: [PagesComponent, CanvasBoxComponent, NewsComponent, TheoryComponent, SimulationsComponent, GalleryComponent, FooterComponent]
})
export class PagesModule { }
