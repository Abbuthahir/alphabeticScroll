import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { IonItemGroup } from '@ionic/angular';
import data from '../../assets/data.json'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any[] = [];
  @ViewChildren(IonItemGroup, { read: ElementRef }) itemGroups!: QueryList<any>
  scroll = false;
  constructor() {
    const sorted = data.sort((a, b) => {
      if (a.last_name < b.last_name) { return -1; }
      if (a.last_name > b.last_name) { return 1; }
      return 0;
    });
    let last = null;
    for (let i = 0; i < sorted.length; i++) {
      const contact = sorted[i];
      if (!last || last != contact.last_name[0]) {
        last = contact.last_name[0];
        this.data.push({ key: last, users: [] })
      }

      this.data[this.data.length - 1].users.push(contact)
    }
  }

  scrollToLetter(letter: any) {
    for (let i = 0; i < this.data.length; i++) {
      const group = this.data[i];
      if (group.key == letter) {
        const group = this.itemGroups.filter((element, index) => index == i);
        if (group && group.length > 0) {
          const el = group[0];
          el.nativeElement.scrollIntoView();
        };
        return;
      }
    }
  }
  letterScrollActive(active: any) {
    this.scroll = active
  }

}
