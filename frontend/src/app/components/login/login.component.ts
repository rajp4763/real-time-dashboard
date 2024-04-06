import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  hide = true;

  constructor(private authService: AuthService) {}

  // onSubmit() {
  //   this.authService.login(this.username, this.password).subscribe(
  //     () => {
  //       /* Navigate to data section on successful login */
  //     },
  //     (error) => {
  //       /* Handle login errors */
  //     }
  //   );
  // }
}
