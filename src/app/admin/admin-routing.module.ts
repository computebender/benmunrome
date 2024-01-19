import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageArticlesComponent } from './view/manage-articles/manage-articles.component';
import { ManageHomepageComponent } from './view/manage-homepage/manage-homepage.component';
import { ManagePortfolioComponent } from './view/manage-portfolio/manage-portfolio.component';
import { ManageTagsComponent } from './view/manage-tags/manage-tags.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage',
      },
      {
        path: 'articles',
        component: ManageArticlesComponent,
        data: { title: 'Articles' },
      },
      {
        path: 'tags',
        component: ManageTagsComponent,
        data: { title: 'Tags' },
      },
      {
        path: 'portfolio',
        component: ManagePortfolioComponent,
        data: { title: 'Portfolio' },
      },
      {
        path: 'homepage',
        component: ManageHomepageComponent,
        data: { title: 'Homepage' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
