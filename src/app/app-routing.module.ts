import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-gaurd/auth.guard';

  const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginComponent,
    },  {
      path: '',
      loadChildren: () => import('../app/components/components.module').then(m => m.ComponentsModule)
    },
    { path: '**', component:LoginComponent },
  ];
 @NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    },)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
