import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadService } from '../services/upload.service';
import { LocalStorageService } from '../../Auth/Services/local-storage.service';

@Component({
  selector: 'img-drop',
  standalone: true,
  imports: [NgxDropzoneModule, CommonModule],
  providers: [UploadService, LocalStorageService],
  templateUrl: './img-drop.component.html',
  styleUrl: './img-drop.component.css'
})
export class ImgDropComponent {
  files: File[] = [];
  @Output() fileSelected = new EventEmitter<File>();

  constructor() {}
  
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    // Emit the first file whenever files change
    if (this.files.length > 0) {
      this.fileSelected.emit(this.files[0]);
    }
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    // Emit null or the next file when removing
    if (this.files.length > 0) {
      this.fileSelected.emit(this.files[0]);
    } else {
      this.fileSelected.emit();
    }
  }
}
