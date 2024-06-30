import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Departamento } from '../../model/departamento';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioRequest } from '../../model/usuario-request';
import { DepartamentoService } from '../../services/departamento/departamento.service';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit, OnDestroy {

  private $destroy = new Subject<void>();

  private dialogRef = inject(MatDialogRef<FormUserComponent>);
  private usuarioService = inject(UsuarioService);
  private departamentoService = inject(DepartamentoService);

  formUser = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    departamentoId: new FormControl("" ,[Validators.required]),
  });

  filteredOptions: Observable<Departamento[]> | undefined;

  displayFn(departamento: Departamento): string {
    return departamento && departamento.nome ? departamento.nome : '';
  }

  private _filter(nome: string): Observable<Departamento[]> {
    return this.departamentoService.listDepartamentos(nome)
      .pipe(
        map(response => response.content as Departamento[]),
        takeUntil(this.$destroy)
      );
  }

  ngOnInit(): void {
    this.filteredOptions = this.formUser.get('departamentoId')!.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value || ''))
      );
      this.filteredOptions.subscribe(data => {
      console.log('Filtered options:', data);
    });
  }

  public handleCloseModal(): void {
    this.formUser.reset();
    this.dialogRef.close();
  }

  createUser(): void {
    if (this.formUser.valid && this.formUser.value) {
      this.usuarioService.createUser(this.formUser.value as UsuarioRequest)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (response) => {
          this.handleCloseModal();
          alert('Usuário criado com sucesso');
        },
        error: (error) => {
          alert('Erro ao criar usuário');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
