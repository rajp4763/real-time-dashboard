import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';

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
