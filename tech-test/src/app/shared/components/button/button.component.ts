import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() type: 'submit' | 'button' = 'button';
  @Input() color: 'warn' | 'accent' | 'primary';

  ngOnInit(): void {
  }

}
