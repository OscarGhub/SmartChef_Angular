import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioInventarioComponent } from './formulario-inventario.component';

describe('FormularioInventarioComponent', () => {
  let component: FormularioInventarioComponent;
  let fixture: ComponentFixture<FormularioInventarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormularioInventarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
