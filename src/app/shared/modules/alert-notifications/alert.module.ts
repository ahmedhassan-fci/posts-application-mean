import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertItemComponent } from './alert-item.component';
import { MaxPipe } from './max.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent, AlertItemComponent, MaxPipe],
  exports: [AlertComponent, AlertItemComponent],
})
export class AlertNotificationsModule {}
