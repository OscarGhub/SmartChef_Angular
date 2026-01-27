import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerRecetaComponent } from './ver-receta.component';

describe('VerRecetaComponent', () => {
  let component: VerRecetaComponent;
  let fixture: ComponentFixture<VerRecetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VerRecetaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
