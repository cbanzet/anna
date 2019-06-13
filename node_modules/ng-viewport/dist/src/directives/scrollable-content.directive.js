import { Directive, ElementRef, Input } from '@angular/core';
import { ScrollService } from '../services';
var ScrollableContentDirective = /** @class */ (function () {
    function ScrollableContentDirective(el, scroll) {
        this.el = el;
        this.scroll = scroll;
        this.scrollTargets = [];
    }
    ScrollableContentDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.targetSelector) {
            var list = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll(this.targetSelector));
            (_a = this.scrollTargets).push.apply(_a, list);
            !list.length && this.scrollTargets.push(this.el.nativeElement);
        }
        else {
            this.scrollTargets.push(this.el.nativeElement);
        }
        this.scrollTargets.forEach(function (el) {
            _this.scroll.bind(el);
        });
        var _a;
    };
    ScrollableContentDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.scrollTargets.forEach(function (el) {
            _this.scroll.unbind(el);
        });
    };
    ScrollableContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vp-scrollable-content]'
                },] },
    ];
    /** @nocollapse */
    ScrollableContentDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ScrollService, },
    ]; };
    ScrollableContentDirective.propDecorators = {
        'targetSelector': [{ type: Input, args: ['vp-scrollable-content',] },],
    };
    return ScrollableContentDirective;
}());
export { ScrollableContentDirective };
