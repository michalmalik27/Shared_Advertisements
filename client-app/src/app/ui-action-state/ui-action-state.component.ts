import { Component, Input } from '@angular/core';
import { ActionState } from '../actionState';

@Component({
  selector: 'ui-action-state',
  templateUrl: './ui-action-state.component.html',
  styleUrls: ['./ui-action-state.component.css'],
})
export class UiActionStateComponent {
  constructor() { }

  @Input() actionState!: ActionState;
}