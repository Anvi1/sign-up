import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpService } from './sign-up.service';

describe('SignUpService', () => {
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService]
    });

    service = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send post request to create user', () => {
    const mockUser = { firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
    service.createUser(mockUser).subscribe();

    const req = httpMock.expectOne('https://demo-api.now.sh/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
  });
});
