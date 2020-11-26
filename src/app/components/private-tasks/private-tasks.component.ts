import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  tasks=[];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getPrivateTasks()
      .subscribe(
        res=>{
          console.log("prueba2");
          console.log(res.users[0].name);
          console.log(res, "entro a private task");
          this.tasks=res.users;
        },
        err=>console.log("error") //err
      )

  }

}
