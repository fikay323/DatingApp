import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService)
  model: any = {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (err) => {console.log(err)}
    })
  }

  logout() {
    this.accountService.logout()
  }

}
