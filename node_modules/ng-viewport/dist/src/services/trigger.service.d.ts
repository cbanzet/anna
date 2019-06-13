import { Observable, Subscription } from 'rxjs';
import { ScrollService } from './scroll.service';
export declare class TriggerService {
    private _subj;
    observable: Observable<{}>;
    constructor(scroll: ScrollService);
    bind(obs: Observable<{}>): Subscription;
}
