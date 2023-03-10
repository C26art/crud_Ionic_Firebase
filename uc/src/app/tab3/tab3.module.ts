import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';


import { Tab3PageRoutingModule } from './tab3-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from '../services/firebase.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page],
  providers:[FirebaseService]
  
})
export class Tab3PageModule {}
