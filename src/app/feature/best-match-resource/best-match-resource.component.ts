import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MtxPipesModule } from '@ng-matero/extensions/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { SubtagsPipe } from '@shared/pipes/subtags.pipe';
import { SharedModule } from '@shared/shared.module';
import { DocFile } from 'app/models/doc-file.model';
import { Mission } from 'app/models/mission.model';
import { DocFileServiceService } from 'app/services/doc-file-service.service';
import { MissionService } from 'app/services/mission.service';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { ResourceAskDialogComponent } from './resource-ask-dialog/resource-ask-dialog.component';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-best-match-resource',
  standalone: true,
  imports: [SharedModule, MatIconModule, MtxPipesModule,SubtagsPipe],
  templateUrl: './best-match-resource.component.html',
  styleUrl: './best-match-resource.component.scss'
})
export class BestMatchResourceComponent {

  selectedFile: File | null = null;
  selectedFiles: File[] | null = null;
  uploadProgress: number = 0;
  docFiles: DocFile[] = [];
  loadingSeachDocs: boolean = false;
  public chartOptions: Partial<ChartOptions>;

  columns: MtxGridColumn[] = [
    { header: 'Key Job titles', field: 'name', sortable: true },
    { header: 'Key skills', field: 'content', sortable: true },
    //{ header: 'File path', field: 'path', sortable: true },
    { header: 'Accuracy', field: 'accuracy', sortable: true },
    { header: 'Matched Words', field: 'matchedWords', sortable: true },
    {
      header: 'Actions',
      field: 'actions',
      sortable: false,
    },
  ];

  searchContent: string = '';
  searching: boolean = false;
  maxAccuracy: number = 1;


  constructor(
    private docFileService: DocFileServiceService,
    private mtxDialog: MtxDialog,
    private missionService: MissionService,
  ) {

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Accuracy", "Not Accurate"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  ngOnInit(): void {
    this.loadDocFiles();
  }

  mission : Mission = new Mission();

  onSearchClick() {
    this.searching = true;
    //call the backend by sending mission
    this.mission.description = this.searchContent;
    this.docFileService.searchByMisson(this.mission).subscribe({
      next: (mission: Mission) => {
        this.mission = mission;
        this.docFiles = mission.relatedDocs;
        this.searching = false;
        this.maxAccuracy = Math.max(...this.docFiles.map(d => d.accuracy));
        //this.alert(this.maxAccuracy.toString());
      },
      error: error => {
        this.alert('Error searching doc files');
        this.searching = false;
      },
    });

  }

  sortedDocFiles(): DocFile[] {
    return this.docFiles.sort((a, b) => b.accuracy - a.accuracy);
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
    if (input && input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.selectedFile = this.selectedFiles[0];
      console.log('Selected file:', this.selectedFiles);
    }
  }

  onUpload() {
    if (this.selectedFiles==null || this.selectedFiles.length === 0) return;

    const failedUploads: File[] = [];
    let currentFileIndex = 0;
    const totalFiles = this.selectedFiles.length;
    const progressPerFile = 100 / totalFiles;

    const uploadNextFile = () => {
      if (currentFileIndex >= totalFiles) {
        // All files processed, notify success/failure
        if (failedUploads.length > 0) {
          this.alert(`Upload complete with errors. Failed to upload: ${failedUploads.map(file => file.name).join(', ')}`);
        } else {
          this.alert("All files uploaded successfully!");
        }
        this.loadDocFiles();
        return;
      }
      if (this.selectedFiles == null) return;

      const file = this.selectedFiles[currentFileIndex];
      this.selectedFile = file;
      const formData = new FormData();
      formData.append('file', file);

      this.docFileService.uploadFile(formData).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            // Update total progress based on file index and current file's progress
            const fileProgress = Math.round((100 * event.loaded) / event.total);
            this.uploadProgress = Math.round((currentFileIndex * progressPerFile) + (fileProgress / totalFiles));
          } else if (event.type === HttpEventType.Response) {
            // File upload complete, move to the next file
            this.uploadProgress = Math.round((currentFileIndex + 1) * progressPerFile); // Update total progress
            currentFileIndex++;
            uploadNextFile(); // Proceed to the next file
          }
        },
        error: (err) => {
          console.error(`Error uploading file ${file.name}`, err);
          failedUploads.push(file); // Add to failed uploads list
          currentFileIndex++;
          uploadNextFile(); // Proceed to the next file
        },
      });
    };

    uploadNextFile(); // Start the upload process
  }


  alert(msg: string) {
    this.mtxDialog.alert(msg, '', () => {
      console.log('Alert closed');
    });
  }

  loadDocFiles(): void {
    this.loadingSeachDocs = true;
    this.docFileService.getAll().subscribe({
      next: (docFiles: DocFile[]) => {
        this.docFiles = docFiles;
        this.loadingSeachDocs = false;
      },
      error: error => {
        console.error('Error loading doc files:', error);
        this.loadingSeachDocs = false;
      },
    });
  }

  downloadFile(doc: DocFile) {
    this.docFileService.downloadFile(doc);
  }


  getFirstElements(content:string,n:number):string[]{
    if (!content) {
      return [];
    }
    let subtags = content.split(',');
    let result = [];
    for (let i = 0; i < Math.min(n,subtags.length); i++) {
      result.push(subtags[i]);
    }
    return result
  }

  getFirst(content:string[],n:number):string[]{
    if (!content) {
      return [];
    }
    let result = [];
    for (let i = 0; i < Math.min(n,content.length); i++) {
      result.push(content[i].trim().replaceAll('undefined ','_'));
    }
    return result
  }

  askAi(doc: DocFile) {
    this.openOriginal(doc,this.mission);
  }

  openOriginal(doc: DocFile,mission: Mission) {
    const dialogRef = this.mtxDialog.originalOpen(ResourceAskDialogComponent, {
      width: '60%',
      data: {
        docfile:doc,
        mission: mission
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      doc.qualification = result.qualification;

    });
  }

  keyUpOnSearch() {
    this.mission.description = this.searchContent;
  }



}
