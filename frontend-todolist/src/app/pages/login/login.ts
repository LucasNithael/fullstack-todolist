import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    RouterModule 
  ],
  templateUrl: './login.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private api: ApiService, private router: Router, private messageService: MessageService) {}

  async login() {
    try {
      console.log('Login:', { username: this.username, password: this.password });

      const result = await this.api.login({
        username: this.username,
        password: this.password
      });


      this.messageService.add({
        severity: 'success',
        summary: 'Login enviado',
        detail: 'Login realizado com sucesso',
      });

      console.log('Login bem-sucedido:', result);

      this.router.navigate(['/']);
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário ou senha inválidos',
      });
    }
  }
}
