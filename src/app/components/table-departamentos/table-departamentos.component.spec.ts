import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDepartamentosComponent } from './table-departamentos.component';

describe('TableDepartamentosComponent', () => {
  let component: TableDepartamentosComponent;
  let fixture: ComponentFixture<TableDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDepartamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
