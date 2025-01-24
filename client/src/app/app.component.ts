import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}) 
export class AppComponent implements OnInit {
  private accountService = inject(AccountService)

  ngOnInit() {
    this.setCurrentUser()
  }

  setCurrentUser = () => {
    const userString = localStorage.getItem(this.accountService.LOCALSTORAGE_KEY)
    if (!userString) return
    const user = JSON.parse(userString)
    this.accountService.currentUser.set(user)
  }

  
}
