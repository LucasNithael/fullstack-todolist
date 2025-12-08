import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { InputMaskModule } from 'primeng/inputmask';
import { ApiService } from '../../services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PriorityLabels, Responsible, Task, TaskCreate } from './task.model';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    SelectModule ,
    ButtonModule,
    TableModule,
    CardModule,
    DialogModule,
    DatePickerModule,
    TextareaModule,
    InputMaskModule
  ],
  templateUrl: './task-list.html'
})
export class TaskListComponent {

  constructor(
    private api: ApiService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getTasks();
    this.getUsers();
  }

  visible: boolean = false;
  priorityLabels: typeof PriorityLabels = PriorityLabels;
  responsible: Responsible[] = [];
  tasks: Task[] = [];
  tasksSearch: Task[] = [];

  taskSearch: TaskCreate = {
    title: '',
    description: '',
    deadline: new Date(),
    priority: 'MEDIUM',
    responsibleId: 0,
    completed: false
  };

  taskCreate: TaskCreate & { id?: number } = {
    title: '',
    description: '',
    deadline: new Date(),
    priority: 'MEDIUM',
    responsibleId: 0,
    completed: false
  };

  priorities = [
    { label: 'Alta', value: 'HIGH' },
    { label: 'Média', value: 'MEDIUM' },
    { label: 'Baixa', value: 'LOW' }
  ];

  situations = [
    { label: 'Em andamento', value: false },
    { label: 'Concluída', value: true }
  ];

 
  async getTasks() {
    try {
      const response = await this.api.getTasks();

      const tasks: Task[] = response.data;
      this.tasksSearch = tasks;

      this.tasks = tasks
        .filter((task: Task) => !task.completed)
        .sort((a: Task, b: Task) => a.id - b.id);

      this.cd.detectChanges();
    } catch (error) {
      console.error(error);
    }
  }

    async getUsers() {
    try {
      const response = await this.api.getUsers();

      this.responsible = response.data.map((user: any) => ({
        label: user.username,
        value: user.id
      }));

      this.cd.detectChanges();
    } catch (error) {
      console.error(error);
    }
  }

  search() {
    const id = this.taskSearch.id;
    const title = this.taskSearch.title.trim().toLowerCase();
    const description = this.taskSearch.description.trim().toLowerCase();
    const responsibleId = this.taskSearch.responsibleId;
    const completed = this.taskSearch.completed;

    this.tasks = this.tasksSearch
      .filter(task => {
        let matches = true;

        if (title) {
          matches = matches && task.title.toLowerCase().includes(title);
        }
        if (description) {
          matches = matches && task.description.toLowerCase().includes(description);
        }
        if (responsibleId && responsibleId !== 0) {
          matches = matches && task.responsible.id === responsibleId;
        }
        if (completed !== null && completed !== undefined) {
          matches = matches && task.completed === completed;
        }
        if (id && id != 0) {
          matches = matches && task.id == id;
        }

        return matches;
      })
      .sort((a, b) => a.id - b.id);

    this.cd.detectChanges();
  }

  clearSearch() {
    this.taskSearch = {
      title: '',
      description: '',
      deadline: new Date(),
      priority: 'MEDIUM',
      responsibleId: 0,
      completed: false
    };
    this.tasks = this.tasksSearch
      .filter((task: Task) => !task.completed)
      .sort((a: Task, b: Task) => a.id - b.id);
    this.cd.detectChanges();
  }



 showDialog(task?: Task) {
  this.visible = true;

    if (task) {
      const dateParts = task.deadline.split('T')[0].split('-');
      const normalizedDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
      );
      this.taskCreate = {
        id: task.id,
        title: task.title,
        description: task.description,
        deadline: normalizedDate,
        priority: task.priority,
        responsibleId: task.responsible.id,
        completed: task.completed
      };
    } else {
      this.taskCreate = {
        title: '',
        description: '',
        deadline: new Date(),
        priority: 'MEDIUM',
        responsibleId: 0,
        completed: false
      };
    }
  }

  async saveTask() {
    try {
      if (!this.validateTaskCreate()) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Por favor, preencha todos os campos obrigatórios.'
        });
        return;
      }

      if (this.taskCreate.id) {
        await this.api.updateTask(this.taskCreate.id, this.taskCreate);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa atualizada com sucesso.'
        });
      } else {
        await this.api.createTask(this.taskCreate);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa criada com sucesso.'
        });
      }

      this.visible = false;
      await this.getTasks();

    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Erro desconhecido';
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: msg
      });
    }
  }

  async remove(id: number) {
    try {
      await this.api.deleteTask(id);
      await this.getTasks();

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Tarefa excluída com sucesso.',
      });

    }
    catch (error : any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.response?.data?.message,
      });
    }

  }
  
  async complete(task: Task) {
  try {

    const taskCreate: TaskCreate = {
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline),
      priority: task.priority,
      responsibleId: task.responsible.id,
      completed: true
    };


    await this.api.updateTask(task.id, taskCreate);

    await this.getTasks();

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Tarefa "${task.title}" marcada como concluída.`,
    });
  } catch (error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.response?.data?.message || 'Erro ao concluir a tarefa.',
    });
  }
}


  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

  validateTaskCreate(): boolean {
    return (
      this.taskCreate.title.trim() !== '' &&
      this.taskCreate.description.trim() !== '' &&
      this.taskCreate.deadline instanceof Date &&
      !isNaN(this.taskCreate.deadline.getTime()) &&
      this.taskCreate.priority &&
      this.taskCreate.responsibleId !== 0
    );
  }
}
