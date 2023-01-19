import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriasDetailsPageRoutingModule } from './materias-details-routing.module';

import { MateriasDetailsPage } from './materias-details.page';
import { FirebaseService } from 'src/app/services/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MateriasDetailsPageRoutingModule
  ],
  declarations: [MateriasDetailsPage],
  providers:[FirebaseService]
})
export class MateriasDetailsPageModule {}
