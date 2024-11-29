import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearviajePage } from './crearviaje.page';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';

class MockStorage {
  get() {
    return of(null);
  }
  set() {
    return of(true);
  }
  remove() {
    return of(true);
  }
}

describe('CrearviajePage', () => {
  let component: CrearviajePage;
  let fixture: ComponentFixture<CrearviajePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearviajePage],
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
    });

    fixture = TestBed.createComponent(CrearviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
