import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  teams =[];

  constructor( private tasksService: TasksService) { }
 // cuando inicie pide todas la tares
  ngOnInit(): void {
    this.tasksService.getTeam()
    .subscribe(
      res=>{
        console.log(res)
        this.teams=res;
      },
      err=>console.log(err)
    )
  }

}
