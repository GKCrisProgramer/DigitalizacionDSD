import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-profile',
  templateUrl: './pyp-profile.component.html',
  styleUrl: './pyp-profile.component.css'
})
export class PypProfileComponent /*implements OnInit*/{
  //profileId: number;

  constructor(private route: ActivatedRoute) {}

  /*ngOnInit(): void {
    this.profileId = +this.route.snapshot.paramMap.get('id');
    // Aquí podrías hacer una llamada al backend para obtener los detalles del perfil según el ID
  }*/

}
