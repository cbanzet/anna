import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollService } from './scroll.service';
var TriggerService = /** @class */ (function () {
    function TriggerService(scroll) {
        this._subj = new Subject();
        this.observable = this._subj.share();
        this.bind(scroll.onScroll);
    }
    TriggerService.prototype.bind = function (obs) {
        var _this = this;
        return obs.subscribe(function () {
            _this._subj.next();
        });
    };
    TriggerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TriggerService.ctorParameters = function () { return [
        { type: ScrollService, },
    ]; };
    return TriggerService;
}());
export { TriggerService };
