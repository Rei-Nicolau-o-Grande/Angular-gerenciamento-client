import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { TableUsuariosComponent } from './components/table-usuarios/table-usuarios.component';
import { TableDepartamentosComponent } from './components/table-departamentos/table-departamentos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormUserComponent,
    TableUsuariosComponent,
    TableDepartamentosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gerenciamento-client';
}
