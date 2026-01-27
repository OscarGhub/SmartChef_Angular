import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TarjetaInventarioComponent } from './tarjeta-inventario.component';

describe('TarjetaInventarioComponent', () => {
  let component: TarjetaInventarioComponent;
  let fixture: ComponentFixture<TarjetaInventarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaInventarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
