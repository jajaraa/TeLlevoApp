import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticatorService } from './authenticator.service';

describe('AuthenticatorService', () => {
  let service: AuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
