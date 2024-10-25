import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { Mission } from 'app/models/mission.model';

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

  constructor(private fb: FormBuilder) {
    this.missionForm = this.fb.group({
      missionDescription: ['', Validators.required]
    });
    this.mission.description = "JMeter,postman"
   }

  ngOnInit(): void {

  }

  submitMission(mission:Mission): void {
    this.loading = true;
    // Submit the mission
    this.loading = false;
  }

}
