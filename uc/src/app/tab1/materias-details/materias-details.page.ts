import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Materias } from '../../models/materias.model';

@Component({
  selector: 'app-materias-details',
  templateUrl: './materias-details.page.html',
  styleUrls: ['./materias-details.page.scss'],
})
export class MateriasDetailsPage implements OnInit {
  materiasFormGroup!: FormGroup;
  @ViewChild('materiasFormGroupDirective')
  materiasFormGroupDirective!: FormGroupDirective;
  public materias!: Materias;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firebaseService.find(id!).subscribe({
      next: (data: Materias) => {
        if (!data) {
          this.router.navigateByUrl('/tabs/list');
        } else {
          this.materias = data;

          this.materiasFormGroup = new FormGroup({
            nome: new FormControl(this.materias.nome, Validators.required),
            cpf: new FormControl(this.materias.cpf, Validators.required),
            email: new FormControl(this.materias.email, Validators.required),
            username: new FormControl(
              this.materias.username,
              Validators.required
            ),
            senha: new FormControl(this.materias.senha, Validators.required),
            categoria: new FormControl(
              this.materias.categoria,
              Validators.required
            ),
            primeiraNota: new FormControl(
              this.materias.primeiraNota,
              Validators.required
            ),
            segundaNota: new FormControl(
              this.materias.segundaNota,
              Validators.required
            ),
            mediaFinal: new FormControl(
              this.materias.mediaFinal,
              Validators.required
            ),
            cep: new FormControl(this.materias.cep, Validators.required),
            logradouro: new FormControl(
              this.materias.logradouro,
              Validators.required
            ),
            numero: new FormControl(this.materias.numero, Validators.required),
            bairro: new FormControl(this.materias.bairro, Validators.required),
            localidade: new FormControl(
              this.materias.localidade,
              Validators.required
            ),
          });
        }
      },
      error: (err) => console.error(`Error on get aluno data. Error: ${err}`),
    });
  }

  editMaterias(values: any) {
    let updateMaterias: Materias = { id: this.materias.id, ...values };
    this.firebaseService
      .update(updateMaterias)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.materiasFormGroupDirective.reset();
  }

  deleteMaterias(id: any) {
    console.log(id);
    if (window.confirm('Tem certeza que deseja deletar?')) {
      this.firebaseService
        .delete(this.materias.id)
        .then(() => this.router.navigateByUrl('/tabs/list'))
        .catch((err) => console.error(err));
    }
  }
}
