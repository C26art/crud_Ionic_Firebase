import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Materias } from '../models/materias.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  materias!: Observable<Materias[]>;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.materias = this.firebaseService.list();
  }

  newMaterias() {
    this.router.navigateByUrl('/tabs/register');
  }

  editMaterias(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
