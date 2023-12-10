import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
    templateUrl: './error.component.html',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ErrorComponent{
    message: string = 'Unknown error'
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}){}
}