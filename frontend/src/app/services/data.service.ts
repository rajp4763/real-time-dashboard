import { Injectable } from '@angular/core';
import { Subject, Observable, take } from 'rxjs';
import io from 'socket.io-client';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket | undefined;
  dataSubject = new Subject<any[]>(); // Observable for data updates
  constructor(private authService: AuthService) {
    console.log('we are about to connect');
    this.connect(); // Connect to WebSocket server on initialization
    console.log('we shoud have connected');
  }
  // connect(): void {
  //   this.authService.isLoggedIn$
  //     .pipe(
  //       take(1) // Take only the first emitted value
  //     )
  //     .subscribe((isLoggedIn) => {
  //       const token = isLoggedIn ? localStorage.getItem('token') : null;
  //       this.socket = io('ws://localhost:8080', { query: { token } });
  //       console.log(this.)
  //     });
  // }
  private connect(): void {
    console.log('connect is called...');
    // Replace 'ws://localhost:8080' with the URL of your WebSocket server
    this.socket = new WebSocket('ws://localhost:8000/');
    // Handle WebSocket events
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };
    this.socket.onmessage = (event: any) => {
      // console.log('Received message:', event.data);

      // Handle incoming messages from the server
      this.dataSubject.next(JSON.parse(event.data));
    };
    this.socket.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };
    this.socket.onclose = () => {
      console.log('WebSocket connection closed.');
      // Attempt to reconnect or handle the closed connection
    };
  }
}
