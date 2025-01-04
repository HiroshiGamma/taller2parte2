import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.css']
})
export class UsersCardsComponent {
  @Input() users!: any[];
}
