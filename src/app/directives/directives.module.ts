import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCustomParallaxHeaderDirective } from './my-custom-parallax-header.directive';

@NgModule({
  declarations: [MyCustomParallaxHeaderDirective],
  imports: [CommonModule],
  exports: [MyCustomParallaxHeaderDirective],
})
export class DirectivesModule {}
