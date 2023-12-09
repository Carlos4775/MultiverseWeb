import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CanvasBoxComponent } from '../canvas-box/canvas-box.component';
import { NewsComponent } from './news/news.component';
import { TheoryComponent } from './theory/theory.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule
    ],
    declarations: [LandingComponent, CanvasBoxComponent, NewsComponent, TheoryComponent, SimulationsComponent, GalleryComponent]
})
export class LandingModule { }
