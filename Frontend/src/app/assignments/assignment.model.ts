import { Student } from '../student/student.model';
import { Subject } from '../subjects/subject.model';

export class Assignment {
  _id!: string;
  id!: number;
  auteurInfo!: Student;
  note!: number;
  dateDeRendu!: Date;
  rendu!: boolean;
  matiereInfo!: Subject;
}
