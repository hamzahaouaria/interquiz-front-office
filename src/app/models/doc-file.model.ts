import { Mission } from "./mission.model";

export class DocFile {
  id: string;
  name: string;
  content: string;
  path: string;
  type: string;
  resume: string;
  accuracy: number = 0;
  matchedWords: string[] = [];
  idealMission:Mission = new Mission();
  qualification: string = '';

  constructor(
    id: string,
    name: string,
    content: string,
    path: string,
    type: string,
    resume: string,
    accuracy: number,
    matchedWords: string[],
    idealMission:Mission,
    qualification: string,
  ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.path = path;
    this.type = type;
    this.resume = resume;
    this.accuracy = accuracy;
    this.matchedWords = matchedWords;
    this.idealMission = idealMission;
    this.qualification = qualification;
  }
}
