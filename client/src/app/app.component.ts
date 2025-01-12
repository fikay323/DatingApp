import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  http = inject(HttpClient)
  users: any

  ngOnInit() {
    this.http.get("https://localhost:5001/api/users").subscribe({
      next: (result) => this.users = result,
      error: (err) => console.log(err),
      complete: () => console.log("Request Completed")
    })
  }
}
