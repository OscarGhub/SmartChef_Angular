import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioColeccionComponent } from './formulario-coleccion.component';

describe('FormularioColeccionComponent', () => {
  let component: FormularioColeccionComponent;
  let fixture: ComponentFixture<FormularioColeccionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormularioColeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
