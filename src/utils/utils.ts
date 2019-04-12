import {Observable, of, timer} from 'rxjs';
import {concatMap, delay, map} from "rxjs/operators";

const utils = {

    getQuoteSet: (): string[] => ['BTCUSD', 'LTCBTC', 'ETHBTC', 'XRPBTC', 'BNBBTC'],

    randomize: (bottom: number, top: number): number => {
        return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
    },

    randomTimeRunFunction: (interval:number, timeBottom: number, timeTop: number, func:()=>number): Observable<number> => {
        return timer(0, interval).pipe(
                    concatMap(item => of(item).pipe(delay(utils.randomize(timeBottom, timeTop)))),
                    map(func));
    }
};

export default utils;
