export class DocFile {
  id: string;
  name: string;
  content: string;
  path: string;
  type: string;
  resume: string;
  accuracy: number = 0;
  matchedWords: string[] = [];

  constructor(
    id: string,
    name: string,
    content: string,
    path: string,
    type: string,
    resume: string,
    accuracy: number,
    matchedWords: string[]
  ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.path = path;
    this.type = type;
    this.resume = resume;
    this.accuracy = accuracy;
    this.matchedWords = matchedWords;
  }
}
