import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-department',
  templateUrl: './pyp-department.component.html',
  styleUrl: './pyp-department.component.css'
})
export class PypDepartmentComponent /*implements OnInit*/{
  //departmentId: number;

  /*constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('id');
    // Aquí podrías hacer una llamada al backend para obtener los detalles del departamento según el ID
  }*/
}
