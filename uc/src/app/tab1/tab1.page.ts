import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Endereco } from '../models/endereco.model';
import { Materias } from '../models/materias.model';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  profile: any = null;
  materiasFormGroup!: FormGroup;
  @ViewChild('materiasFormGroupDirective')
  materiasFormGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private avatarService: AvatarService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
     this.profile = data;
    });
  }

  ngOnInit(): void {
    this.materiasFormGroup = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]/),
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i),
      ]),
      username: new FormControl('', [Validators.required]),
      senha: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/),
      ]),
      categoria: new FormControl('', [Validators.required]),
      primeiraNota: new FormControl('', [Validators.required]),
      segundaNota: new FormControl('', [Validators.required]),
      mediaFinal: new FormControl('', [Validators.required]),
      cep: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      logradouro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+$/),
      ]),
      bairro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      localidade: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  createMaterias(values: any) {
    let newMaterias: Materias = { ...values };
    this.firebaseService.save(newMaterias);
    console.log(newMaterias);
    this.materiasFormGroupDirective.reset();
  }

  calcular(): void {
    let primeiraNota = this.materiasFormGroup.get('primeiraNota')?.value;
    let segundaNota = this.materiasFormGroup.get('segundaNota')?.value;
    let calcMedia = (parseInt(primeiraNota) + parseInt(segundaNota)) / 2;
    this.materiasFormGroup.patchValue({
      mediaFinal: calcMedia,
    });
    const resultFinal = '';
    if (calcMedia >= 6) {
      alert('Aluno aprovado!');
    } else {
      alert('Aluno reprovado!');
    }
  }

  loadEndereco() {
    const cep: string = this.materiasFormGroup.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result: Endereco) => {
        this.materiasFormGroup.patchValue({
          cep: result.cep,
          logradouro: result.logradouro,
          bairro: result.bairro,
          localidade: result.localidade,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
