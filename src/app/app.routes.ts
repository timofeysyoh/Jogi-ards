import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
    {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cell',
    loadComponent: () => import('./cell/cell.page').then( m => m.CellPage)
  },
  {
    path: 'addcard',
    loadComponent: () => import('./addcard/addcard.page').then( m => m.AddcardPage)
  },

];
