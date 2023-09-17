import { Directive, ElementRef, Input } from '@angular/core';
import { Fighter } from '../fighter';

@Directive({
  selector: '[pokemon-Fighter-Card]'
})
export class BorderFighterCardDirective {

  @Input()
  public fighter: Fighter;

  private selectedBorderColorAsh: string = "blue";
  private selectedBorderColorGoh: string = "red";
  private defaultHeight: number = 320;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.fighter.team == 0) {
      this.setBorder(this.selectedBorderColorAsh);
    } else {
      this.setBorder(this.selectedBorderColorGoh);
    }

    this.setHeight(this.defaultHeight);
 }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = '4px solid ' + color;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
