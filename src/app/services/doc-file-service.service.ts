import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocFile } from 'app/models/doc-file.model';
import { Mission } from 'app/models/mission.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocFileServiceService {

  private apiUrl = `http://localhost:8081/api/v1/doc-file`;

  constructor(private http: HttpClient) {}

  createFile(docFile: DocFile): Observable<DocFile> {
    return this.http.post<DocFile>(`${this.apiUrl}`, docFile);
  }

  getAll(): Observable<DocFile[]> {
    return this.http.get<DocFile[]>(`${this.apiUrl}`);
  }

  remove(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadFile(formData: FormData) {
    return this.http
      .post(`${this.apiUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events',
      })
  }

  setAccuracyForDocs(misson: Mission) {
    return this.http.post<DocFile[]>(`${this.apiUrl}/set-accuracy-all`, misson);
  }
}
