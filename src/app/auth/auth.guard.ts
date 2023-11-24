import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = authService.getIsAuth();

  if(!isAuth){
    router.navigate(['/login'])
  }

  console.log(isAuth);
  return isAuth;
};
