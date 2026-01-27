import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TarjetaColeccionComponent } from './tarjeta-coleccion.component';

describe('TarjetaColeccionComponent', () => {
  let component: TarjetaColeccionComponent;
  let fixture: ComponentFixture<TarjetaColeccionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaColeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
