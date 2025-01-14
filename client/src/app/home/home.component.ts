import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient)
  registerMode = false
  users: any[] = []

  ngOnInit() {
    this.getUsers()
  }

  closeRegisterComponent = () => {
    this.registerMode = false
  }

  registerToggle = () => {
    this.registerMode = !this.registerMode
  }

  getUsers = () => {
    this.http.get("https://localhost:5001/api/users").subscribe({
      next: (result: any) => {
        this.users = result
      },
      error: (err) => console.log(err),
      complete: () => console.log("Request Completed")
    })
  }

}
