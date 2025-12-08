import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from './register.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    RouterModule
  ],
  templateUrl: './register.html'
})
export class RegisterComponent {

  constructor(private api: ApiService, private messageService: MessageService, private router: Router) {}

  user : User = {
    username: '',
    password: ''
  };

  async register() {
    try{
      await this.api.register(this.user);

      this.messageService.add({
          severity:'success',
          summary: 'Success', 
          detail: 'Registro realizado com sucesso! Você já está logado.'
        });

      this.router.navigate(['/']);

    } catch (error : any) {
      const msg = error.response?.data?.message || error.message || 'Erro desconhecido';
      this.messageService.add({
        severity:'error', 
        summary: 'Error', 
        detail: msg
      });
    }
  }
}
