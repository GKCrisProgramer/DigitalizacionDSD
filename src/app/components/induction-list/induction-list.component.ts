import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-induction-list',
  templateUrl: './induction-list.component.html',
  styleUrl: './induction-list.component.css'
})
export class InductionListComponent implements OnInit{
  course: any[] = [];
  documentsByCourse: { [key: number]: any[] } = {};
  expandedCourse: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(){
    this.http.get<any[]>(`${environment.apiUrl}/course`).subscribe(data =>{
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
    this.http.get<any[]>(`${environment.apiUrl}/course-document/${documentId}/document`).subscribe(data =>{
      this.documentsByCourse[documentId] = data;
    });
  }

  onDocumentSelected(documentId: number){
    this.router.navigate(['/Cursos-Induccion/', documentId])
  }

  goBack() {
    this.router.navigate(['/manual-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
