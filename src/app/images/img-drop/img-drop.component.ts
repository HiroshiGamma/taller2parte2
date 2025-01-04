import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private UploadService: UploadService, private localStorageService: LocalStorageService) {}
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    if (this.files.length === 0) {
      console.log('No hay archivos para subir');
      return false;
    }

    const fileForm = new FormData();
    const fileData = this.files[0];

    fileForm.append('file', fileData);
    fileForm.append('upload_preset', 'cloudinary-taller-IDWM');
    fileForm.append('cloud_name', 'dt8dw9v57');

    this.UploadService.uploadService(fileForm).subscribe({
      next: (response) => {
        console.log('Respuesta de la subida:', response);
        this.localStorageService.setVariable('imgUrl', response.url)
      },
      error: (error) => {
        console.log('Error en la subida:', error);
      },
    });



    return true;
  }
}
