import { Directive, Input } from '@angular/core';
import { generalConstants } from 'src/app/config';

@Directive({
  selector: '[PostsDefaultImage]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()',
  },
})
export class DefaultPostDirective {
  @Input() src!: string;

  defaultImg = generalConstants.defaultPostPath;

  onError(): void {
    this.src = this.defaultImg;
  }

  checkPath(src: string): string {
    return src ? src : this.defaultImg;
  }
}
