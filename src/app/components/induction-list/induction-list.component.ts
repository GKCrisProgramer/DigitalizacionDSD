import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InductionListService } from '../../services/induction-list.service';
import { windowOption } from '../../../global-settings/window-option';

@Component({
  selector: 'app-induction-list',
  templateUrl: './induction-list.component.html',
  styleUrl: './induction-list.component.css'
})
export class InductionListComponent implements OnInit{
  course: any[] = [];
  documentsByCourse: { [key: number]: any[] } = {};
  expandedCourse: number | null = null;

  constructor(
    private inductionListService: InductionListService, 
    private router: Router,
  ) {}

  ngOnInit(){
    this.inductionListService.getCourse().subscribe(data =>{
      this.course = data;
    });
  }

  toggleCourse(courseId: number) {
    if (this.expandedCourse === courseId) {
      this.expandedCourse = null;
    } else {
      this.expandedCourse = courseId;
      if (!this.documentsByCourse[courseId]){
        this.getDocumentsByCourse(courseId);
      }
    }
  }

  getDocumentsByCourse(documentId: number){
    this.inductionListService.getDocumentsByCourse(documentId).subscribe(data =>{
      this.documentsByCourse[documentId] = data;
    });
  }

  onDocumentSelected(documentId: number){
    const url = `${window.location.origin}/cursos-Induccion/${documentId}`;
    window.open(url, '_blank', windowOption.options); 
  }

  goBack() {
    this.router.navigate(['/manual-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
