import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupMessageComponent } from './shared/popup-message/popup-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupMessageComponent],
  template: `
    <app-popup-message></app-popup-message>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Social-Media-Platform';
}
