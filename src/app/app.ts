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
import { PaypalFeeInfoDialog } from './paypal-fee-info-dialog';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  imports: [FormsModule, MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, MatIconModule, MatDialogModule, CurrencyPipe],
  template: `
      <mat-card>
        <h1>Honiggläser</h1>
        <h4>aus <br/> Steutzer Hobby-Imkerei</h4>
        <p>Als leidenschaftliche Hobby-Imkerin pflege ich die Bienen mit viel Liebe und teile gern meinen selbstgemachten Honig mit dir. Dein Beitrag von <strong>6 €</strong> pro <strong>Glas</strong> unterstützt das kleine Projekt und hilft die Bienen zu versorgen. Als Dankeschön kannst du die entsprechende Anzahl Honiggläser mitnehmen.</p>
        <p>Bitte gib im Verwendungszweck <strong>X Honiggläser</strong> an, damit ich weiß, wie viele Gläser du erworben hast.</p>
        <img src="biene.png" alt="Honiggläser" />
        <p style="text-align: center;">Danke, dass du das regionale Hobby unterstützt!</p>
      <!-- <div class="button-row">
        <button mat-mini-fab (click)="decrement()" [disabled]="quantity() <= 1">
          <mat-icon>remove</mat-icon>
        </button>
        <span style="min-width: 40px; text-align: center; font-size: 1.2rem; display: inline-block;">{{ quantity() }}</span>
        <button mat-mini-fab (click)="increment()" [disabled]="quantity() >= 3">
          <mat-icon>add</mat-icon>
        </button>
      </div> -->
      <!-- <div class="summary-row">
        <span>Honig: <span id="quantity">{{ quantity() * 6 | currency:'EUR' }}</span></span>
        <span class="paypal-fee">
          <button mat-icon-button (click)="openPaypalFeeInfo()" aria-label="Info zu PayPal-Gebühren">
            <mat-icon>info</mat-icon>
          </button>
          <span id="paypal-fee">PayPal-Gebühren: {{ paypalFee() | currency:'EUR' }}</span>
        </span>
        <span>Gesamtbetrag: <span id="total">{{ total() | currency:'EUR' }}</span></span>
      </div> -->
      <button mat-raised-button (click)="goToPayPal()">weiter zu PayPal</button>
      <p class="ps">PS: PayPal Zahlungsart => Für Freunde und Familie</p>
      <p class="version">Version: {{ appVersion }}</p>
    </mat-card>
  `,
  styles: `
    img {
      width: 100%;
      max-width: 64px;
      margin: 1rem auto;
    }
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
      margin-bottom: 0px;
    }

    h4 {
      margin-top: 0px;
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
      margin-top: 1rem;
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

    .ps {
      font-size: 0.8rem;
      color: #666;
      margin-top: 1rem;
      text-align: center;
      font-style: italic;
      margin-bottom: 0;
    }
    .version {
      font-size: 0.7rem;
      color: #999;
      margin-top: 1rem;
      text-align: center;
    }
  `
})
export class App {
  private dialog = inject(MatDialog);
  appVersion = version;

  paypalFixedFee = 0.39; // fixed PayPal fee in EUR
  paypalPercentFee = 0.0249; // variable PayPal fee (2.49%)

  quantity = signal(1);
  // paypalFee = computed(() => {
  //   const basePrice = this.quantity() * 6;
  //   const total = (basePrice + this.paypalFixedFee) / (1 - this.paypalPercentFee);
  //   return Math.round((total - basePrice) * 100) / 100;
  // });
  total = computed(() => {
    const basePrice = this.quantity() * 6;
    // return Math.round(((basePrice + this.paypalFixedFee) / (1 - this.paypalPercentFee)) * 100) / 100;
    return basePrice;
  });

  goToPayPal() {
    const paypalLink = 'https://www.paypal.me/scherke59';
    window.location.href = paypalLink;
  }

  openPaypalFeeInfo() {
    this.dialog.open(PaypalFeeInfoDialog, {
      width: '420px'
    });
  }

  increment() {
    this.quantity.update(q => q < 3 ? q + 1 : q);
  }
  decrement() {
    this.quantity.update(q => q > 1 ? q - 1 : q);
  }
}
