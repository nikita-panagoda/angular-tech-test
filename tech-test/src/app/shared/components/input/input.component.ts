import {Component, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TextInputType} from '../../types/input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: FormControl | null = null;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() errorMessage = '';
  @Input() type: TextInputType = 'text';
}
