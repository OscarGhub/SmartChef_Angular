import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TarjetaRecetaExtendidaComponent } from './tarjeta-receta-extendida.component';

describe('TarjetaRecetaExtendidaComponent', () => {
  let component: TarjetaRecetaExtendidaComponent;
  let fixture: ComponentFixture<TarjetaRecetaExtendidaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaRecetaExtendidaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaRecetaExtendidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
