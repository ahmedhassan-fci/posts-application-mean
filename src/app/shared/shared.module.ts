import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSubmitComponent } from './components';
import { DefaultPostDirective } from './directives';

@NgModule({
  declarations: [ButtonSubmitComponent, DefaultPostDirective],
  imports: [CommonModule],
  exports: [ButtonSubmitComponent, DefaultPostDirective],
})
export class SharedModule {}
