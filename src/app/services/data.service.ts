import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  dataSubject = new Subject<any[]>(); // Observable for data updates

  constructor() {
    this.connect(); // Connect to WebSocket server on initialization
  }

  connect(): void {
    // Replace with your WebSocket server URL
    this.socket = io('ws://localhost:your-port');

    this.socket.on('data-update', (data: any[]) => {
      this.dataSubject.next(data); // Emit data through subject
    });
  }
}
