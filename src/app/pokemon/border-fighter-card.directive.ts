import { Directive, ElementRef, Input } from '@angular/core';
import { PokemonFighter } from './pokemonFighter';

@Directive({
  selector: '[pokemon-Fighter-Card]'
})
export class BorderFighterCardDirective {

  @Input()
  public pokemonFighter: PokemonFighter;

  private selectedBorderColorAsh: string = "blue";
  private selectedBorderColorGoh: string = "red";
  private defaultHeight: number = 300;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.pokemonFighter.team == 0) {
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
