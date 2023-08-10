import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabetScrollComponent } from './alphabet-scroll/alphabet-scroll.component';



@NgModule({
  declarations: [AlphabetScrollComponent],
  imports: [
    CommonModule
  ],
  exports: [AlphabetScrollComponent]
})
export class SharedComponentsModule { }
