import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { Mission } from 'app/models/mission.model';
import { MissionService } from 'app/services/mission.service';

@Component({
  selector: 'app-mission-navigator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './mission-navigator.component.html',
  styleUrl: './mission-navigator.component.scss'
})
export class MissionNavigatorComponent {

  mission : Mission = new Mission();
  missionForm: FormGroup;

  loading: boolean = false;

  constructor(private fb: FormBuilder,private missionService: MissionService) {
    this.missionForm = this.fb.group({
      missionDescription: ['', Validators.required]
    });
    this.mission.description = "JMeter,postman"
   }

  ngOnInit(): void {

  }

  submitMission(mission:Mission): void {
    this.loading = true;
    this.missionService.sendMission(mission).subscribe(
      (mission: Mission) => {
        this.mission = mission;
        this.loading = false;
      },
      (error) => {
        console.error('Error sending mission:', error);
        this.loading = false;
      }
    );
  }

}
