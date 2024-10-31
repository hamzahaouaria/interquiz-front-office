import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MtxPipesModule } from '@ng-matero/extensions/core';
import { SharedModule } from '@shared/shared.module';
import { DocFile } from 'app/models/doc-file.model';
import { Mission } from 'app/models/mission.model';
import { DocFileServiceService } from 'app/services/doc-file-service.service';
import { MissionService } from 'app/services/mission.service';

@Component({
  selector: 'app-mission-navigator',
  standalone: true,
  imports: [SharedModule, MatIconModule,MtxPipesModule],
  templateUrl: './mission-navigator.component.html',
  styleUrl: './mission-navigator.component.scss',
})
export class MissionNavigatorComponent {

  mission: Mission = new Mission();
  missionForm: FormGroup;
  selectedFile: File | null = null;
  uploadProgress: number = 0;

  docFiles: DocFile[] = [];

  loading: boolean = false;
  loadingSeachDocs: boolean = false;

  constructor(
    private fb: FormBuilder,
    private missionService: MissionService,
    private docFileService: DocFileServiceService
  ) {
    this.missionForm = this.fb.group({
      missionDescription: ['', Validators.required],
    });
    this.mission.description = 'JMeter,postman';
  }

  ngOnInit(): void {
    this.loadDocFiles();
  }

  submitMission(mission: Mission): void {
    this.loading = true;
    this.missionService.sendMission(mission).subscribe({
      next: (mission: Mission) => {
        this.mission = mission;
        this.loading = false;
      },
      error: error => {
        console.error('Error sending mission:', error);
        this.loading = false;
      },
    });
  }

  loadDocFiles(): void {
    this.loading = true;
    this.docFileService.getAll().subscribe({
      next: (docFiles: DocFile[]) => {
        this.docFiles = docFiles;
        this.loading = false;
      },
      error: error => {
        console.error('Error loading doc files:', error);
        this.loading = false;
      },
    });
  }

  removeDocFile(doc: DocFile) {
    this.docFileService.remove(doc.id).subscribe({
      next: () => {
        this.docFiles = this.docFiles.filter(d => d.id !== doc.id);
      },
      error: error => {
        console.error('Error removing doc file:', error);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0] ?? null;
      console.log('Selected file:', this.selectedFile);
    }
  }

  onUpload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.docFileService.uploadFile(formData).subscribe(
      event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.uploadProgress = 0;
        this.loadDocFiles()
      }
    });
  }

  setAccuracyForDocs(misson: Mission) {
    this.loadingSeachDocs = true;
    this.docFileService.setAccuracyForDocs(misson).subscribe({
      next: (docFiles: DocFile[]) => {
        this.docFiles = docFiles;
        this.loadingSeachDocs = false;
        this.loadDocFiles()
      },
      error: error => {
        console.error('Error setting accuracy for docs:', error);
        this.loadingSeachDocs = false;
      },
    });
  }

  sortedDocFiles(): DocFile[] {
    return this.docFiles.sort((a, b) => b.accuracy - a.accuracy);
  }
}
