import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fallbackImage]'
})
export class FallbackImageDirective {

  @Input()
  fallbackImage!: string;

  constructor(private eRef: ElementRef) { }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.fallbackImage || '/assets/png/avatar.png';
  }

}
