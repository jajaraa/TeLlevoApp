import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesPage } from './viajes.page';
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

describe('ViajesPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajesPage],
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
    });

    fixture = TestBed.createComponent(ViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
