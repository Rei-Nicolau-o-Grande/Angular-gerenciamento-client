import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../../services/departamento/departamento.service';
import { Departamento } from '../../model/departamento';

@Component({
  selector: 'app-table-departamentos',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatCardModule],
  templateUrl: './table-departamentos.component.html',
  styleUrl: './table-departamentos.component.scss'
})
export class TableDepartamentosComponent implements AfterViewInit {

  private departamentoService = inject(DepartamentoService);

  colunsDepartamento: string[] = ['nome', 'actions'];

  dataSource: MatTableDataSource<Departamento>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDepartamentos("");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDepartamento(element: Departamento) {
    console.log("Editando departamento", element);
  }

  deleteDepartamento(element: Departamento) {
    console.log("Deletando departamento", element);
  }

  getDepartamentos(nome: string) {
    return this.departamentoService.listDepartamentos(nome)
      .subscribe((data) => {
        this.dataSource.data = data.content;
      });
  }
}
