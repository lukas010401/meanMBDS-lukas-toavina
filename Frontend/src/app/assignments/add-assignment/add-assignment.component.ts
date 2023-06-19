import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/shared/students.service';
import { SubjectsService } from 'src/app/shared/subjects.service';
import { Subject } from 'src/app/subjects/subject.model';
import { Student } from 'src/app/student/student.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent {
  // champs du formulaire
  dateDeRendu!: Date;
  etudiant!: Student;
  matiere!: Subject;
  note!: number;
  rendu: boolean = false;
  remarque = '';
  subjects!: Subject[];
  students!: Student[];

  constructor(
    private assignmentsService: AssignmentsService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getSubjects();
  }

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.auteur_id = this.etudiant._id;
    nouvelAssignment.matiere_id = this.matiere._id;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = this.rendu;
    nouvelAssignment.note = this.note;
    nouvelAssignment.remarque = this.remarque;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((message) => {
        console.log(message);

        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(['/home']);
      });
  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe((data) => {
      this.subjects = data;
      // this.assignments = data.docs;

      console.log('Données reçues subjects');
      console.log(data);
    });
  }

  getStudents() {
    this.studentsService.getStudents().subscribe((data) => {
      this.students = data;
      // this.assignments = data.docs;

      console.log('Données reçues students');
      console.log(data);
    });
  }
}
