import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriasDetailsPage } from './materias-details.page';

const routes: Routes = [
  {
    path: '',
    component: MateriasDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriasDetailsPageRoutingModule {}
