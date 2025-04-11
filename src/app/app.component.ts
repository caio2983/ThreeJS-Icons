import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThreeComponent } from './three/three.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'three-icons';
}
