import { Injectable } from '@angular/core';
import { Subject, Observable, take } from 'rxjs';
import io from 'socket.io-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  dataSubject = new Subject<any[]>(); // Observable for data updates

  constructor(private authService: AuthService) {
    this.connect(); // Connect to WebSocket server on initialization
  }

  connect(): void {
    this.authService.isLoggedIn$
      .pipe(
        take(1) // Take only the first emitted value
      )
      .subscribe((isLoggedIn) => {
        const token = isLoggedIn ? localStorage.getItem('token') : null;
        this.socket = io('ws://localhost:your-port', { query: { token } });
      });
  }
}
