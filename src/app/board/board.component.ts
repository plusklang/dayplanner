import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Task } from '../types';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks!: Task[];
  constructor(
      public auth: AuthService,
      public api: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.api.get<{tasks: Task[]}>('/tasks').subscribe({
      next: (res) => {
        this.tasks = res.tasks
        console.log('loaded tasks', res.tasks)
      }
    })
  }

}
