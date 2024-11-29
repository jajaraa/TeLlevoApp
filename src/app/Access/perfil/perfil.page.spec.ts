import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticatorService } from 'src/app/servicios/authenticator.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockAuthenticatorService {
  user = { name: 'John Doe', email: 'john.doe@example.com' };

  getUser() {
    return of(this.user);
  }
}

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let authenticatorService: AuthenticatorService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticatorService, useClass: MockAuthenticatorService },
        ApiService,
        { provide: Router, useValue: { getCurrentNavigation: () => ({ extras: { state: { user: { name: 'John Doe', email: 'john.doe@example.com' } } } }) } }
      ]
    });

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    authenticatorService = TestBed.inject(AuthenticatorService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
