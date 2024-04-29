import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  let needsLogin = route.data["needsLogin"] ?? false;

  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user && !needsLogin) {
    return router.createUrlTree(['/home']);
  }
  
  if (!user && needsLogin) {
    return router.createUrlTree(['/login']);
  }

  return true;
};