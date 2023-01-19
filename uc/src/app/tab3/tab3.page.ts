import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Materias } from '../models/materias.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  materiasList!: Materias[];
  searchFG!: FormGroup;

  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      nome: new FormControl('', Validators.required),
    });
  }

  search(materias: any) {
    this.firebaseService.findByName(materias.nome).subscribe({
      next: (result) => {
        if (!result) {
          this.presentToast(`Nome não encontrado: ${materias.nome}`);
        }
        this.materiasList = result as Materias[];
      },
      error: (err) => {
        console.log(err);
        this.presentToast(`Service unavailable`);
      },
    });
    this.searchFG.reset();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle',
    });
    await toast.present();
  }

  editMaterias(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
