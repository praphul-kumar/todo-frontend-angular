import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  // Get title from APP Components
  @Input() title = 'Todo App';
  constructor () {
    
  }
}
