import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-reparations',
  templateUrl: './owner-reparations.component.html',
  styleUrls: ['./owner-reparations.component.css']
})
export class OwnerReparationsComponent implements OnInit {

  constructor() { }
  reparaciones =  JSON.parse(localStorage.getItem('reparaciones'));
  ngOnInit(): void {
    console.log(this.reparaciones)
  }

}
