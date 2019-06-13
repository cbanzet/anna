import { NgModule } from '@angular/core';
import { DIRECTIVES } from './directives';
import { SERVICES } from './services';
var ViewportModule = /** @class */ (function () {
    function ViewportModule() {
    }
    ViewportModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    providers: SERVICES.slice(),
                    declarations: DIRECTIVES.slice(),
                    bootstrap: [],
                    exports: DIRECTIVES.slice()
                },] },
    ];
    /** @nocollapse */
    ViewportModule.ctorParameters = function () { return []; };
    return ViewportModule;
}());
export { ViewportModule };
