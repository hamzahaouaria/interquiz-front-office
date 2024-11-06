import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DocFile } from 'app/models/doc-file.model';
import { Mission } from 'app/models/mission.model';
import { DocFileServiceService } from 'app/services/doc-file-service.service';

@Component({
  selector: 'app-resource-ask-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule, MatButtonModule,MatIconModule],
  templateUrl: './resource-ask-dialog.component.html',
  styleUrl: './resource-ask-dialog.component.scss'
})
export class ResourceAskDialogComponent {
  docfile!: DocFile;
  mission!: Mission;
  question:string = '';
  constructor(
    public dialogRef: MatDialogRef<ResourceAskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private docFileService: DocFileServiceService
  ) {
    this.docfile = data.docfile;
    this.mission = data.mission;
  }

  loadingDoc: boolean = false;

  //onInit
  ngOnInit(): void {
    this.loadQualification();
  }

  loadQualification() {
    this.loadingDoc = true;
    this.docFileService.getQualifications(this.docfile,this.mission).subscribe((doc:DocFile) => {
      this.docfile = doc;
      this.loadingDoc = false;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  askAi() {
    this.question = this.question.trim();
    this.mission.question = this.question;
    this.loadingDoc = true;
    this.docFileService.getQualifications(this.docfile,this.mission).subscribe((doc:DocFile) => {
      this.docfile = doc;
      this.loadingDoc = false;
    });
  }

}
