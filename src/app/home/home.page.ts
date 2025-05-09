import { Component, OnInit } from '@angular/core';
import { Task } from '../../app/model/task.model';
import { TaskService } from '../services/task.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, IonicModule]  
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  taskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  async addTask() {
    if (!this.taskTitle.trim()) return;
    await this.taskService.addTask(this.taskTitle);
    this.taskTitle = '';
    this.loadTasks();
  }

  // Método para alternar el estado de completado de la tarea
  async toggleTaskCompletion(task: Task) {
    await this.taskService.toggleTaskCompletion(task.id);
    this.loadTasks(); // Actualiza la lista de tareas
  }

  async deleteTask(task: Task) {
    await this.taskService.deleteTask(task.id);
    this.loadTasks();
  }
}
