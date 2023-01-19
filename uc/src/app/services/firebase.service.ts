import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Materias } from '../models/materias.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  save(materias: Materias): Promise<void> {
    const document = doc(collection(this.firestore, 'materias'));
    return setDoc(document, materias);
  }

  list(): Observable<Materias[]> {
    const materiasCollection = collection(this.firestore, 'materias');
    return collectionData(materiasCollection, { idField: 'id' }).pipe(
      map((result) => result as Materias[])
    );
  }

  find(id: string): Observable<Materias> {
    const document = doc(this.firestore, `materias/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Materias;
      })
    );
  }

  findByName(nome: string): Observable<Materias[]> {
    const materiasList = this.list();
    return materiasList.pipe(
      map((materias) =>
        materias.filter((materias) => {
          const fullName = materias.nome.concat('', materias.username);
          return fullName.toLowerCase().match(nome.toLowerCase());
        })
      )
    );
  }

  update(materias: Materias): Promise<void> {
    const document = doc(this.firestore, 'materias', materias?.id);
    const { id, ...data } = materias;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'materias', id);
    console.log(document);
    return deleteDoc(document);
  }
}
