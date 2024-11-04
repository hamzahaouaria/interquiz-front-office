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
    if (input && input.files) {
      this.selectedFile = input.files[0] ?? null;
      console.log('Selected file:', this.selectedFile);
    }
  }

  onUpload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.docFileService.uploadFile(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.uploadProgress = 0;
        this.alert("upload success");
        this.loadDocFiles();
      }
    });
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
      result.push(content[i]);
    }
    return result
  }

}
