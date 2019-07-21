import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tbn-navbar,[tbnNavbar]',
  template: `<ng-content></ng-content>`,
  host: {
    class: 'navbar'
  }
})
export class TbnNavbarComponent {

  constructor() { }

}
