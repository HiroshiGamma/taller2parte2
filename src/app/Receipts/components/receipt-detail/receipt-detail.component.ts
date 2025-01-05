import { Component } from '@angular/core';
import { ReceiptDto } from '../../interfaces/ReceiptDto';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ReceiptCardComponent } from "../receipt-card/receipt-card.component";

@Component({
  selector: 'app-receipt-detail',
  imports: [CommonModule, ReceiptCardComponent],
  templateUrl: './receipt-detail.component.html',
  styleUrl: './receipt-detail.component.css'
})
export class ReceiptDetailComponent {
  receipt?: ReceiptDto;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private receiptService: ReceiptService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReceipt(+id);
    }
  }

  private loadReceipt(id: number) {
    this.loading = true;
    this.receiptService.getReceipt(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (receipt) => this.receipt = receipt,
        error: (err) => this.error = err.message || 'Failed to load receipt'
      });
  }

  downloadPdf() {
    if (this.receipt) {
      this.receiptService.downloadReceipt(this.receipt.id)
        .subscribe((blob: Blob | MediaSource) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `receipt-${this.receipt?.id}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        });
    }
  }
}
