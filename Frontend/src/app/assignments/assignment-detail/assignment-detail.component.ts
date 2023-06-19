import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Student } from 'src/app/student/student.model';
import { Subject } from 'src/app/subjects/subject.model';
import { StudentsService } from 'src/app/shared/students.service';
import { SubjectsService } from 'src/app/shared/subjects.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  subjects!: Subject[];
  students!: Student[];

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    this.getStudents();
    this.getSubjects();

    const id = +this.route.snapshot.params['id'];
    console.log('Dans le ngOnInit de detail, id = ' + id);

    // on va chercher l'assignment à afficher
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
      // this.assignmentTransmis.auteurInfo = this.students.find(assignment.auteur_id)
      console.log(assignment);
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

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;

    // console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);

    // on demande au service la suppression de l'assignment
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        // Pour cacher le detail, on met l'assignment à null
        this.assignmentTransmis = undefined;

        // et on navigue vers la page d'accueil
        this.router.navigate(['/home']);
      });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on appelle le service pour faire l'update
    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
      });
  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(
      ['/assignments', this.assignmentTransmis?.id, 'edit'],
      {
        queryParams: {
          // nom: this.assignmentTransmis?.nom,
          matiere: 'Angular',
        },
        fragment: 'edition',
      }
    );
  }

  isLogged() {
    // renvoie si on est loggé ou pas
    return this.authService.loggedIn;
  }
}
