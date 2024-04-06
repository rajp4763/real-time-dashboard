import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WebSocketService } from '../../services/data.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent {
  data: any[] = []; // Array to store received data
  displayedColumns = ['column1', 'column2', 'column3']; // Define table columns
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
        if (
          this.data[i][this.displayedColumns[j]] !==
          this.previousData[i][this.displayedColumns[j]]
        ) {
          // Element has changed
          const cellElement = document.getElementById(`cell-${i}-${j}`); // Get cell element reference (improve this for performance)
          if (cellElement) {
            cellElement.classList.add('changed-data'); // Add CSS class for highlighting
          }
        }
      }
    }
  }
}
