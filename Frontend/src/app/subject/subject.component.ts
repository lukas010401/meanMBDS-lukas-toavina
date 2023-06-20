import { Component } from '@angular/core';
import { Subject } from '../subjects/subject.model';
import { SubjectsService } from '../shared/subjects.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent {
  titre = 'Liste des étudiants';
  // les données à afficher
  subjects: Subject[] = [];
  // Pour la data table
  displayedColumns: string[] = [
    // 'id',
    'matiere',
    'prof',
  ];

  constructor(private subjectsService: SubjectsService) {}

  ngOnInit(): void {
    console.log(
      'OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)'
    );
    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getAssignments
    // TODO

    this.getSubjects();
  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe((data) => {
      this.subjects = data;

      console.log('Données reçues');
      console.log(data);
    });
  }
}
