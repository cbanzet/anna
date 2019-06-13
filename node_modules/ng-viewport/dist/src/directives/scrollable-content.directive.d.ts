import { ElementRef } from '@angular/core';
import { ScrollService } from '../services';
export declare class ScrollableContentDirective {
    private el;
    private scroll;
    private targetSelector;
    private scrollTargets;
    constructor(el: ElementRef, scroll: ScrollService);
    private ngAfterViewInit();
    private ngOnDestroy();
}
