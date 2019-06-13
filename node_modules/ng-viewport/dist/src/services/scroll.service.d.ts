import { Observable } from 'rxjs';
export declare class ScrollService {
    private _subj;
    private boundSet;
    private handler;
    /**
     * Throttled Scroll Event of bound targets
     */
    onScroll: Observable<Event>;
    /**
     * Emits when the scrolling is started on bound targets
     */
    onScrollStart: Observable<Event>;
    /**
     * Emits when the scrolling is finished on bound targets
     */
    onScrollEnd: Observable<Event>;
    constructor();
    /**
     * Binds its listener to the event target
     * to trigger checking position of in-view directive
     * or for emiting its scroll events
     *
     * Returns the unbinding function
     */
    bind(target: EventTarget): Function;
    /**
     * Removes its listener from the target
     */
    unbind(target: EventTarget): void;
    private static _handler(this, e);
}
