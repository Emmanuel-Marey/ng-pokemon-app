import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[pokemon-Unknown-Fighter-Card]'
})
export class BorderUnknownFighterCardDirective {

  private selectedDefaultBorderColor: string = "gray";
  private defaultHeight: number = 320;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setBorder(this.selectedDefaultBorderColor);
    this.setHeight(this.defaultHeight);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = '4px solid ' + color;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
