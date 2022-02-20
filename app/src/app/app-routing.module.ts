import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'ketangdetails', loadChildren: './ketangdetails/ketangdetails.module#KetangdetailsPageModule' },
  { path: 'shipingoumai', loadChildren: './shipingoumai/shipingoumai.module#ShipingoumaiPageModule' },
  { path: 'videopurcsucc', loadChildren: './videopurcsucc/videopurcsucc.module#VideopurcsuccPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'problem', loadChildren: './problem/problem.module#ProblemPageModule' },
  { path: 'ketan', loadChildren: './ketan/ketan.module#KetanPageModule' },
  { path: 'ketaninfo', loadChildren: './ketaninfo/ketaninfo.module#KetaninfoPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
