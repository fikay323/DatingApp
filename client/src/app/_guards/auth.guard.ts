import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../_services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  if(!accountService.currentUser()) {
    toastr.error('Pls login before continuing into this route')
    return router.navigateByUrl('./')
  }
  return true;
};
