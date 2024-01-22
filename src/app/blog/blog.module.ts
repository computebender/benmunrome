import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BlogEffects } from './store/blog.effects';
import { blogFeatureKey, reducer } from './store/blog.reducer';
import { RevisionEffects } from './store/revision.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(blogFeatureKey, reducer),
    EffectsModule.forFeature([BlogEffects, RevisionEffects]),
  ],
})
export class BlogModule {}
