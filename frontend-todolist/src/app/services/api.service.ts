import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { TaskCreate } from '../pages/task-list/task.model';
import { User } from '../pages/register/register.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: AxiosInstance;
  private apiPublic: AxiosInstance;

  constructor() {
    const token = localStorage.getItem('token');

    this.api = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    this.apiPublic = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Atualiza token dinamicamente (após login)
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // ---------------------- TASK ----------------------

  async getTasks() {
    try {
      const response = await this.api.get('/task');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tasks:', error);
      throw error;
    }
  }

  async createTask(data : TaskCreate) {
    try {
      const response = await this.api.post('/task', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar task:', error);
      throw error;
    }
  }

  async updateTask(id: number, data : TaskCreate) {
    try {
      const response = await this.api.put(`/task/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar task:', error);
      throw error;
    }
  }

  async deleteTask(id: number) {
    try {
      const response = await this.api.delete(`/task/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar task:', error);
      throw error;
    }
  }

  // ---------------------- USER ----------------------

  async login(credentials: { username: string; password: string }) {
    try {
      const response = await this.apiPublic.post('/user/login', credentials);
      if (response.data.data.token) {
        this.setToken(response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async register(user: User) {
    try {
      const response = await this.apiPublic.post('/user/register', user);

      if (response.data.data.token) {
        this.setToken(response.data.data.token);
      }

      return response.data;
      
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

    async getUsers() {
    try {
      const response = await this.api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar users:', error);
      throw error;
    }
  }
}
