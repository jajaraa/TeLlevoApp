import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsperandoPage } from './esperando.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, of } from 'rxjs';

class MockGeolocation {
  getCurrentPosition() {
    return Promise.resolve({ coords: { latitude: 0, longitude: 0 } });
  }
  watchPosition(): Observable<any> {
    return of({ coords: { latitude: 0, longitude: 0 } });
  }
}

describe('EsperandoPage', () => {
  let component: EsperandoPage;
  let fixture: ComponentFixture<EsperandoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsperandoPage],
      providers: [
        { provide: Geolocation, useClass: MockGeolocation }
      ]
    });

    fixture = TestBed.createComponent(EsperandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
