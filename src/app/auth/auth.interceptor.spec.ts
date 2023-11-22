import { TestBed } from '@angular/core/testing';

import { SignupInterceptor } from './auth.interceptor';

describe('SignupInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SignupInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SignupInterceptor = TestBed.inject(SignupInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
