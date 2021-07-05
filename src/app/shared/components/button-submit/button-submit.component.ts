import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'posts-button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss'],
})
export class ButtonSubmitComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() isLoading!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
