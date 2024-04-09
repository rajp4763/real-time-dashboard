import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    RouterOutlet,
    CommonModule,
  ],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
