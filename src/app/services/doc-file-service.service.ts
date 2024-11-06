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

  searchByMisson(mission: Mission) {
    return this.http.post<Mission>(`${this.apiUrl}/search-resource-by-mission`, mission);
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

  downloadFile(doc: DocFile) {
    let fileName = doc.path.split('/').pop();
    if (!fileName) {
      fileName = 'atos_resume_ai_search_resource.pdf';
    }
    this.http.get(`${this.apiUrl}/download/${doc.id}`, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Set the filename here
      a.click();
      window.URL.revokeObjectURL(url); // Clean up URL object after download
    });
  }

  getQualifications(docfile: DocFile, mission: Mission) {
    return this.http.post<DocFile>(`${this.apiUrl}/ask-for-qualification/${docfile.id}`, mission);
  }
}
