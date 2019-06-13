import { Directive, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { defer, forEach } from 'lodash';
import { TriggerService } from '../services';
var SELECTOR = 'vp-in-view';
var InViewDirective = /** @class */ (function () {
    function InViewDirective(trigger, el) {
        this.trigger = trigger;
        this.el = el;
        this._config = new Config({});
        this.event = new EventEmitter();
    }
    Object.defineProperty(InViewDirective.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            var _this = this;
            forEach(value, function (val, key) {
                _this._config[key] = val;
            });
        },
        enumerable: true,
        configurable: true
    });
    InViewDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        defer(function () {
            _this.subs = _this.trigger.observable.subscribe(_this.handler.bind(_this));
            _this.handler();
        });
    };
    InViewDirective.prototype.isInViewPort = function () {
        var rect = this.el.nativeElement.getBoundingClientRect();
        return (rect.top >= 0 - this._config.marginTop &&
            rect.left >= 0 - this._config.marginLeft &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + this._config.marginBottom &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + this._config.marginRight);
    };
    InViewDirective.prototype.handler = function () {
        if (this.isInViewPort()) {
            this.event.emit();
            !this.config.infinite && this.subs.unsubscribe();
        }
    };
    InViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[" + SELECTOR + "]",
                    exportAs: SELECTOR
                },] },
    ];
    /** @nocollapse */
    InViewDirective.ctorParameters = function () { return [
        { type: TriggerService, },
        { type: ElementRef, },
    ]; };
    InViewDirective.propDecorators = {
        'event': [{ type: Output, args: [SELECTOR,] },],
        'config': [{ type: Input, args: [SELECTOR + '-config',] },],
    };
    return InViewDirective;
}());
export { InViewDirective };
var Config = /** @class */ (function () {
    function Config(value) {
        var _this = this;
        this.marginTop = 0;
        this.marginBottom = 0;
        this.marginLeft = 0;
        this.marginRight = 0;
        this.infinite = false;
        forEach(value, function (val, key) {
            _this[key] = val;
        });
    }
    Object.defineProperty(Config.prototype, "margin", {
        set: function (value) {
            this.marginHorizontal = value;
            this.marginVertical = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "marginVertical", {
        set: function (value) {
            this.marginTop = value;
            this.marginBottom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "marginHorizontal", {
        set: function (value) {
            this.marginLeft = value;
            this.marginRight = value;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
