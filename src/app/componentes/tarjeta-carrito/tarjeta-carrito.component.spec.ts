import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TarjetaCarritoComponent } from './tarjeta-carrito.component';

describe('TarjetaCarritoComponent', () => {
  let component: TarjetaCarritoComponent;
  let fixture: ComponentFixture<TarjetaCarritoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaCarritoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
