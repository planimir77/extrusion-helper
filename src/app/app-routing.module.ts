import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home Page' }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'roll-weight',
    loadChildren: () => import('./roll-weight/roll-weight.module')
      .then(m => m.RollWeightModule)
  },
  {
    path: 'bag-weight',
    loadChildren: () => import('./bag-weight/bag-weight.module')
      .then(m => m.BagWeightModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
