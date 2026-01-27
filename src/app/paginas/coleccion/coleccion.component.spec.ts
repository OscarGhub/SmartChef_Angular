import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColeccionComponent } from './coleccion.component';

describe('ColeccionComponent', () => {
  let component: ColeccionComponent;
  let fixture: ComponentFixture<ColeccionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ColeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
