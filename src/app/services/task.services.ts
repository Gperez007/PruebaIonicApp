import { Inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../../app/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private storageReady = false;

  constructor(@Inject(Storage) private storage: Storage) { 
    this.init();
  }

  // Inicialización del almacenamiento
  async init() {
    await this.storage.create();
    this.storageReady = true;
    this.tasks = (await this.storage.get('tasks')) || [];
  }

  // Obtener todas las tareas
  getTasks(): Task[] {
    return this.tasks;
  }

  // Agregar una nueva tarea
  async addTask(title: string): Promise<void> {
    const newTask: Task = {
      id: Date.now(),  // ID único basado en la fecha actual
      title,
      completed: false,  // Estado inicial como no completado
    };
    this.tasks.push(newTask);
    await this.saveTasks();
  }

  // Alternar el estado de completado de la tarea
  async toggleTaskCompletion(id: number): Promise<void> {
    const task = this.tasks.find(t => t.id === id);  // Buscar tarea por ID
    if (task) {
      task.completed = !task.completed;  // Cambiar el estado completado
      await this.saveTasks();
    }
  }

  // Eliminar una tarea por ID
  async deleteTask(id: number): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);  // Filtrar tareas, eliminando la tarea con el ID proporcionado
    await this.saveTasks();
  }

  // Guardar las tareas en el almacenamiento
  private async saveTasks() {
    if (this.storageReady) {
      await this.storage.set('tasks', this.tasks);  // Guardar las tareas en el almacenamiento
    }
  }
}
