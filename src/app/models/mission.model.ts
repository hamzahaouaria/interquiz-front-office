import { DocFile } from './doc-file.model';
import { Language } from './language.model';
import { Quiz } from './quiz.model';

export class Mission {
  id: number;
  name: string;
  description: string;
  language: Language;
  quizzes: Quiz[];
  level1: string;
  level2: string;
  level3: string;

  // add other properties here
  jobTitles: string;
  techTools: string;
  methodologies: string;
  fieldOfStudies: string;
  skills: string;
  certifications: string;
  industries: string;
  specificTools: string;
  relatedDocs: DocFile[];
  yearsOfExperience: string;
  companiesAndClient: string;
  locations: string;


  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.language = new Language();
    this.quizzes = [];
    this.level1 = '';
    this.level2 = '';
    this.level3 = '';
    this.jobTitles = '';
    this.techTools = '';
    this.methodologies = '';
    this.fieldOfStudies = '';
    this.skills = '';
    this.certifications = '';
    this.industries = '';
    this.specificTools = '';
    this.relatedDocs = [];
    this.yearsOfExperience = '';
    this.companiesAndClient = '';
    this.locations = '';


  }
}
