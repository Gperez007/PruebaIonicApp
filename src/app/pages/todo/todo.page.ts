import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  imports: [IonicModule, CommonModule],
  styleUrls: ['./todo.page.scss'],
  standalone: true, 
})
export class TodoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
