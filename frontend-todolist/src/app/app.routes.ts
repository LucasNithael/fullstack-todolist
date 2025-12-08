import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    // { path: '', component: TaskListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: TaskListComponent,
        canActivate: [authGuard]
    }
];
