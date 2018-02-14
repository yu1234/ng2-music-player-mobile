import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

/**
 * Generated class for the CollapsingHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'collapsing-header',
  templateUrl: 'collapsing-header.html'
})
export class CollapsingHeaderComponent implements OnInit {
  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  @Input('backgroundImg') backgroundImg: string;
  @Output() collapsingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  newHeaderHeight: any;
  isShrink: boolean = false;
  headerBackground: object = {};

  @ViewChild('contentWrapper')
  content: ElementRef;

  constructor(public element: ElementRef, public renderer2: Renderer2, private zone: NgZone) {
    console.log('Hello CollapsingHeaderComponent Component');
  }

  ngOnInit(): void {
    if (this.backgroundImg) {
      this.headerBackground = {
        'background-repeat': 'no-repeat'
      };
      RGBaster.colors(this.backgroundImg, {
        // return up to 30 top colors from the palette
        paletteSize: 5,
        // don't count white
        exclude: ['rgb(255,255,255)'],
        // do something when done
        success: (payload) => {
          this.headerBackground['background-color'] = payload.dominant;
        }
      });
      if (this.isShrink) {
        this.headerBackground['background-image'] = '';
      } else {
        this.headerBackground['background-image'] = `url(${this.backgroundImg})`;
        this.headerBackground['background-size'] = '100% 100%';
      }

    }
    this.renderer2.setStyle(this.content.nativeElement, 'height', this.headerHeight + 'px');
    this.collapsingChange.emit(this.isShrink);
    this.scrollArea.ionScroll.subscribe((ev) => {
      this.zone.run(() => {
        this.resizeHeader(ev);
      });
    });

  }

  private resizeHeader(ev) {
    ev.domWrite(() => {
      this.newHeaderHeight = this.headerHeight - ev.scrollTop;
      let oldShrink = this.isShrink;
      if (this.newHeaderHeight <= 0) {
        this.newHeaderHeight = 0;
        this.isShrink = false;
        this.headerBackground['background-image'] = '';
      } else {
        this.isShrink = true;
        this.headerBackground['background-image'] = `url(${this.backgroundImg})`;
        this.headerBackground['background-size'] = '100% 100%';
      }
      if (this.isShrink !== oldShrink) {
        this.collapsingChange.emit(this.isShrink);
      }
      this.renderer2.setStyle(this.content.nativeElement, 'height', this.newHeaderHeight + 'px');

      for (let headerElement of   this.content.nativeElement.children) {

        let totalHeight = headerElement.offsetTop + headerElement.clientHeight;

        if (totalHeight > this.newHeaderHeight && !headerElement.isHidden) {
          headerElement.isHidden = true;
          this.renderer2.setStyle(headerElement, 'opacity', '0');
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          this.renderer2.setStyle(headerElement, 'opacity', '0.7');
        }
      }
    });
  }
}
