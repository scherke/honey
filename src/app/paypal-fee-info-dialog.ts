import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-paypal-fee-info-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  template: `
    <h2 mat-dialog-title>PayPal-Gebühren</h2>
    <div mat-dialog-content>
      <p>
        Für jede PayPal-Zahlung fallen Gebühren an:<br>
        <strong>2,49&nbsp;%</strong> des Betrags + <strong>0,39&nbsp;€</strong> Fixgebühr.<br>
        Die Gebühren werden automatisch auf den Gesamtbetrag aufgeschlagen, sodass nach Abzug der Gebühren der ursprüngliche Produktpreis übrig bleibt.
      </p>
      <p style="font-size: 0.9em; color: #888;">
        Quelle: <a href="https://www.paypal.com/de/webapps/mpp/paypal-fees" target="_blank" rel="noopener">PayPal Gebührenübersicht</a>
      </p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Schließen</button>
    </div>
  `
})
export class PaypalFeeInfoDialog {}
