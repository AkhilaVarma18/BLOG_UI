import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core/primitives/di';

export const guardsGuard: CanActivateFn = (route, state) => {
   const authService=inject(AuthService);
  const router=inject(Router);
  const user=authService.user();
  if(!user){
    router.navigate(['/login']);
    return false;
  }
  const isWriter=user.roles.includes('writer');
  if(!isWriter){
    authService.logout();
    return false;
  }
  return true;
};
