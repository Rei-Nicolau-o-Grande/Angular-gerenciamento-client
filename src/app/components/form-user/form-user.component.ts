import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { Departamento } from '../../model/departamento';


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
    MatAutocompleteModule
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {

  formUser = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    departamento: new FormControl('', [Validators.required]),
  });


  departamentos: Departamento[] = [{id: 1, nome: 'TI'}, {id: 2, nome: 'RH'}, {id: 3, nome: 'Financeiro'}];

  filteredOptions: Observable<Departamento[]> | undefined;

  displayFn(departamento: Departamento): string {
    return departamento && departamento.nome ? departamento.nome : '';
  }

  private _filter(nome: string): Departamento[] {
    const filterValue = nome.toLowerCase();

    return this.departamentos.filter(option => option.nome.toLowerCase().includes(filterValue));
  }
}
