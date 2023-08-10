import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-alphabet-scroll',
  templateUrl: './alphabet-scroll.component.html',
  styleUrls: ['./alphabet-scroll.component.scss'],
})
export class AlphabetScrollComponent implements AfterViewInit {
  letters: any[] = [];
  lastOpen = null;
  @Output() letterSelected = new EventEmitter<string>();
  @Output() scrollingLetter = new EventEmitter<boolean>();
  @ViewChild('bar') sidebar!: ElementRef;

  constructor(private gestureCtrl: GestureController) {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < str.length; i++) {
      let nextChar = str.charAt(i);
      this.letters.push(nextChar);
    }
  }

  goToLetter(letter: any){
    if(this.lastOpen == letter) return;

    this.lastOpen = letter;
    this.letterSelected.emit(letter);
  }

  ngAfterViewInit() {
    const moveGuesture = this.gestureCtrl.create({
      el:this.sidebar.nativeElement,
      direction:'y',
      threshold: 0,
      gestureName:'move',
      onStart: ev => {
       this.scrollingLetter.emit(true);
      },
      onMove: ev=> {
        const closestEle: any = document.elementsFromPoint(ev.currentX, ev.currentY);
        if(closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1){
          const letter = closestEle.innerText;
          if(letter){
            if(letter != this.lastOpen){
              Haptics.impact({ style: ImpactStyle.Light});
            }
            this.goToLetter(letter);
          }
        }
      },
      onEnd: ev =>{
       this.scrollingLetter.emit(false);

      }
    });
    moveGuesture.enable();
   }

}
