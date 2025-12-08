import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule // ⬅ necessário para funcionar
  ],
  templateUrl: './app.html'
})
export class AppComponent {}
