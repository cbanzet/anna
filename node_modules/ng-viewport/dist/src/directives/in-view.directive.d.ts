import { ElementRef, EventEmitter } from '@angular/core';
import { TriggerService } from '../services';
export interface IConfig {
    infinite?: boolean;
    margin?: number;
    marginHorizontal?: number;
    marginVertical?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}
export declare class InViewDirective {
    private trigger;
    el: ElementRef;
    private _config;
    event: EventEmitter<{}>;
    private subs;
    constructor(trigger: TriggerService, el: ElementRef);
    config: IConfig;
    ngAfterViewInit(): void;
    private isInViewPort();
    private handler();
}
