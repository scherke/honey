import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { PaypalFeeInfoDialogComponent } from './paypal-fee-info-dialog.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, MatIconModule, MatDialogModule, CurrencyPipe],
  standalone: true,
  template: `
    <mat-card>
      <h1>Honig Verkauf</h1>
      <p>Preis pro Glas: {{ 6 | currency:'EUR' }}</p>
      <div class="button-row">
        <button mat-mini-fab (click)="decrement()" [disabled]="quantity() <= 1">
          <mat-icon>remove</mat-icon>
        </button>
        <span style="min-width: 40px; text-align: center; font-size: 1.2rem; display: inline-block;">{{ quantity() }}</span>
        <button mat-mini-fab (click)="increment()">
          <mat-icon>add</mat-icon>
        </button>
      </div>
      <div class="summary-row">
        <span>Honig: <span id="quantity">{{ quantity() * 6 | currency:'EUR' }}</span></span>
        <span class="paypal-fee">
          <button mat-icon-button (click)="openPaypalFeeInfo()" aria-label="Info zu PayPal-Gebühren">
            <mat-icon>info</mat-icon>
          </button>
          <span id="paypal-fee">PayPal-Gebühren: {{ paypalFee() | currency:'EUR' }}</span>
        </span>
        <span>Gesamtbetrag: <span id="total">{{ total() | currency:'EUR' }}</span></span>
      </div>
      <button mat-raised-button (click)="goToPayPal()">Zu PayPal</button>
    </mat-card>
  `,
  styles: `
    mat-card {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 600px) {
      mat-card {
        margin: unset;
        width: 100vw;
        box-sizing: border-box;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    h1 {
      margin-bottom: 1rem;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }

    .button-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin: 1rem 0;

      button[mat-mini-fab] {
        height: 40px;
        width: 40px;
        min-width: 40px;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        display: flex;
        justify-content: center;
        min-width: 40px;
        font-size: 1.2rem;
      }
    }

    button[mat-raised-button] {
      width: 100%;
    }

    .summary-row {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      margin: 1rem 0 2rem;

      .paypal-fee {
        display: flex;
        align-items: center;
      }
    }
  `
})
export class AppComponent {
  private dialog = inject(MatDialog);

  paypalFixedFee = 0.39; // fixed PayPal fee in EUR
  paypalPercentFee = 0.0249; // variable PayPal fee (2.49%)

  quantity = signal(1);
  paypalFee = computed(() => {
    const basePrice = this.quantity() * 6;
    const total = (basePrice + this.paypalFixedFee) / (1 - this.paypalPercentFee);
    return Math.round((total - basePrice) * 100) / 100;
  });
  total = computed(() => {
    const basePrice = this.quantity() * 6;
    return Math.round(((basePrice + this.paypalFixedFee) / (1 - this.paypalPercentFee)) * 100) / 100;
  });

  goToPayPal() {
    const paypalLink = `https://www.paypal.me/amad3u5/${this.total()}`;
    window.location.href = paypalLink;
  }

  openPaypalFeeInfo() {
    this.dialog.open(PaypalFeeInfoDialogComponent, {
      width: '420px'
    });
  }

  increment() {
    this.quantity.update(q => q + 1);
  }
  decrement() {
    this.quantity.update(q => q > 1 ? q - 1 : q);
  }
}
