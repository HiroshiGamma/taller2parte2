import { Component } from '@angular/core';
import { QueryObject } from '../../interfaces/QueryObjectReceipt';
import { ReceiptService } from '../../services/receipt.service';
import { ReceiptDto } from '../../interfaces/ReceiptDto';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";
import { ReceiptCardComponent } from "../../components/receipt-card/receipt-card.component";

@Component({
  selector: 'app-receipt-list',
  imports: [CommonModule, NavbarComponent, ReceiptCardComponent],
  providers: [ReceiptService],
  templateUrl: './receipt-list.component.html',
  styleUrl: './receipt-list.component.css'
})
export class ReceiptListComponent {
  receipts: ReceiptDto[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchTerm = '';
  sortDescending = true;

  constructor(private receiptService: ReceiptService) {}

  ngOnInit() {
    this.loadReceipts();
  }

  async loadReceipts() {
    this.loading = true;
    this.error = '';

    const query: QueryObject = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      name: this.searchTerm || undefined,
      isDescending: this.sortDescending
    };

    try {
      const response = await this.receiptService.getReceipts(query).toPromise();
      this.receipts = response?.items || [];
      this.totalItems = response?.totalCount || 0;
    } catch (err: any) {
      this.error = err.message || 'Failed to load receipts';
    } finally {
      this.loading = false;
    }
  }

  async search() {
    this.currentPage = 1;
    await this.loadReceipts();
  }

  async sort() {
    this.sortDescending = !this.sortDescending;
    await this.loadReceipts();
  }

  async changePage(newPage: number) {
    this.currentPage = newPage;
    await this.loadReceipts();
  }
}
