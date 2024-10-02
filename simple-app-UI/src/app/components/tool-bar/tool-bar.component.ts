import { Component } from '@angular/core';
import { ImportsModule } from '../../prime-imports';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {

}
