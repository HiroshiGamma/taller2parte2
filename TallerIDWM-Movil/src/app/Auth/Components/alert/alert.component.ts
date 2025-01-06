import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, IonButton],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
}
