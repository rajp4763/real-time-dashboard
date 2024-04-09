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
  changedIndices: number[] = []; // Store indices of changed rows

  constructor(private dataService: WebSocketService) {}

  ngOnInit(): void {
    this.dataService.dataSubject.subscribe((data) => {
      this.previousData = this.data; // Update previous data
      this.data = data; // Update current data
      this.checkForChanges(this.previousData, this.data); // Call function to check for changes
    }); 
  }

  checkForChanges(prevData:any, currentData:any) {
    const changedPercentage:any = []
    const prevDataObject:any = {}
    const previousDataMap = prevData.map((item:any) => {prevDataObject[item.id] = item.percentage})
    console.log('previous data map is : ', JSON.stringify(prevDataObject))

    currentData.forEach((item:any) => {
      const previousPercentage = prevDataObject[item.id]
      if (previousPercentage !== undefined && previousPercentage !== item.percentage)  {
        changedPercentage.push({...item,  color:"green", previousPercentage, percentage: item.percentage})
      }
      else{
        changedPercentage.push({...item})
      }
    });
    this.data = changedPercentage
    console.log('this data is', this.data)
  }
  

  isChanged(index: number): boolean {
    return this.changedIndices.includes(index);
  }
}
