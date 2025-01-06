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
  
  /**
   * Maneja la selección de archivos.
   * @param event El evento de selección de archivos.
   */
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    // Emitir el primer archivo siempre que cambien los archivos
    if (this.files.length > 0) {
      this.fileSelected.emit(this.files[0]);
    }
  }
  
  /**
   * Maneja la eliminación de archivos.
   * @param event El evento de eliminación de archivos.
   */
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    // Emitir null o el siguiente archivo al eliminar
    if (this.files.length > 0) {
      this.fileSelected.emit(this.files[0]);
    } else {
      this.fileSelected.emit();
    }
  }
}
