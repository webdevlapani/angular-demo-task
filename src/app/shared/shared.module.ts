import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WidgetModule } from './widget/widget.module';

@NgModule({
  imports: [CommonModule, WidgetModule],
})
export class SharedModule {}
