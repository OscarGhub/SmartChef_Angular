import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TarjetaPerfilComponent } from './tarjeta-perfil.component';

describe('TarjetaPerfilComponent', () => {
  let component: TarjetaPerfilComponent;
  let fixture: ComponentFixture<TarjetaPerfilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaPerfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
