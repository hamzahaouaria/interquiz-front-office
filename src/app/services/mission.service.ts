import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mission } from 'app/models/mission.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl = `http://localhost:8080/api/v1/missions`;

  constructor(private http: HttpClient) { }

  sendMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/generateLevelsForMission`, mission);
  }

  getUpdatedMission(id: string) {
    return this.http.get(`${this.apiUrl}/updated/${id}`);
  }
}
