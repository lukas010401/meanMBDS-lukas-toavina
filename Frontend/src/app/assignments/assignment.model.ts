import { Student } from '../student/student.model';
import { Subject } from '../subjects/subject.model';

export class Assignment {
  _id!: string;
  id!: number;
  auteur_id!: string;
  auteurInfo!: Student;
  note!: number;
  dateDeRendu!: Date;
  rendu!: boolean;
  matiereInfo!: Subject;
  matiere_id!: string;
  remarque!: string;
}
