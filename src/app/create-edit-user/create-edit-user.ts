import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-elements-example-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialog-elements-example-dialog.component.html',
  styleUrl: './dialog-elements-example-dialog.component.scss'
})
export class DialogElementsExampleDialogComponent {

}
