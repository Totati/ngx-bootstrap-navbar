import { Component, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  ngDoCheck(){
    console.count()
  }
}
