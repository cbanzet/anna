import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { throttler } from '../helpers';
var BUFFER_TIME = 100;
var DEBOUNCE_TIME = 180;
var THROTTLE_TIME = 180;
var ScrollService = /** @class */ (function () {
    function ScrollService() {
        this._subj = new Subject();
        this.boundSet = new Set();
        this.handler = ScrollService._handler.bind(this);
        this.onScroll = this._subj.throttleTime(BUFFER_TIME).share();
        this.onScrollEnd = this._subj.debounceTime(DEBOUNCE_TIME).share();
        this.onScrollStart = throttler(this._subj, THROTTLE_TIME);
        this.bind(window);
    }
    /**
     * Binds its listener to the event target
     * to trigger checking position of in-view directive
     * or for emiting its scroll events
     *
     * Returns the unbinding function
     */
    ScrollService.prototype.bind = function (target) {
        if (!this.boundSet.has(target)) {
            target.addEventListener('scroll', this.handler);
            this.boundSet.add(target);
        }
        return this.unbind.bind(this, target);
    };
    /**
     * Removes its listener from the target
     */
    ScrollService.prototype.unbind = function (target) {
        this.boundSet.delete(target);
        target.removeEventListener('scroll', this.handler);
    };
    ScrollService._handler = function (e) {
        this._subj.next(e);
    };
    ScrollService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollService.ctorParameters = function () { return []; };
    return ScrollService;
}());
export { ScrollService };
