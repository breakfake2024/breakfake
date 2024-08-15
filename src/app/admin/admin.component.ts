import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/localStorage/local-storage.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(
    private router: Router,
    private locaStorge: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
