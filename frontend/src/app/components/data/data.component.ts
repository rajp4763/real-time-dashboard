import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WebSocketService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent {
  data: any[] = []; // Array to store received data
  displayedColumns = ['id', 'name', 'percentage']; // Define table columns
  previousData: any[] = []; // Store previous data

  constructor(private dataService: WebSocketService) {}

  ngOnInit(): void {
    this.dataService.dataSubject.subscribe((data) => {
      this.previousData = this.data; // Update previous data
      this.data = data; // Update current data
      this.checkForChanges(); // Call function to check for changes
    });
  }

  checkForChanges() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.displayedColumns.length; j++) {
        const previousValue = this.previousData[i]?.[this.displayedColumns[j]]; // Handle undefined previous data
        const currentValue = this.data[i][this.displayedColumns[j]];

        if (previousValue !== currentValue) {
          // Element has changed
          const cellElement = document.getElementById(`cell-${i}-${j}`);
          if (cellElement) {
            cellElement.classList.add('changed-data'); // Add CSS class for highlighting
          }
        } else {
          const cellElement = document.getElementById(`cell-${i}-${j}`);
          if (cellElement) {
            cellElement.classList.remove('changed-data'); // Remove class if no change
          }
        }
      }
    }
  }
}
