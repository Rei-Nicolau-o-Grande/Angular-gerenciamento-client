import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioRequest } from '../../model/usuario-request';
import { UsuarioResponse } from '../../model/usuario-response';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { FormUserComponent } from '../form-user/form-user.component';


@Component({
  selector: 'app-table-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './table-usuarios.component.html',
  styleUrl: './table-usuarios.component.scss'
})
export class TableUsuariosComponent implements AfterViewInit, OnDestroy {

  private dialogService = inject(MatDialog);

  private $destroy = new Subject<void>;

  private usuarioService = inject(UsuarioService);

  colunsUsuarios: string[] = ['nome', 'email', 'departamento', 'actions'];

  dataSource: MatTableDataSource<UsuarioResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers("");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editUser(element: UsuarioRequest) {
    console.log("Editando usuário", element);
  }

  deleteUser(element: UsuarioResponse) {
    console.log("Deletando usuário", element);
  }

  getUsers(nome: string) {
    return this.usuarioService.listUsers(nome)
      .subscribe((data) => {
        this.dataSource.data = data.content;
      });
  }

  public openCreateUsuarioDialog() {
    this.dialogService.open(FormUserComponent, {
      width: '500px',
    })
  }


  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
