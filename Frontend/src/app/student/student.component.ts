import { Component } from '@angular/core';
import { Student } from './student.model';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  titre = 'Liste des étudiants';
  // les données à afficher
  students: Student[] = [];
  // Pour la data table
  displayedColumns: string[] = [
    // 'id',
    'nomEleve',
  ];

  constructor(
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    console.log(
      'OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)'
    );
    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getAssignments
    // TODO

    this.getStudents();
  }

  getStudents() {
    this.studentsService
      .getStudents()
      .subscribe((data) => {
        this.students = data;

        console.log('Données reçues');
        console.log(data);
      });
  }
}
