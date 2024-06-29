import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gerenciamento-client';
}
