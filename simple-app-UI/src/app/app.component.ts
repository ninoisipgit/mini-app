import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToolBarComponent,HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Simple-App-UI';

}
