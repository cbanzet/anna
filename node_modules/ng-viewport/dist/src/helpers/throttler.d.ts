import { Observable } from 'rxjs';
export declare function throttler<T>(observable: Observable<T>, throttleTime: number): Observable<T>;
