import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[pokemon-Border-Small-Card]'
})
export class BorderSmallCardDirective {

  private initialBorderColor: string = '#E0E0E0';
  private defaultBoderColor: string = "#009688";
  private defaultHeight: number = 340;

  constructor(private el: ElementRef) {
    this.setBorder(this.initialBorderColor);
    
    this.setHeight(this.defaultHeight);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.defaultBoderColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialBorderColor);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = '4px solid ' + color;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
