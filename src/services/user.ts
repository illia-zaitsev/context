import {Observable, of, timer} from 'rxjs';
import { concatMap, delay, map } from "rxjs/operators";

const _random = (bottom:number, top:number) => {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
};

class User {

    private _balance:Observable<any> = timer(0, 1000).pipe(
                                            concatMap( item => of(item).pipe(delay(_random(500, 3000) ) )),
                                            map(x => _random(1100, 1200)));

    get balance():Observable<any> {
        return this._balance;
    }

    toString():string {
        return 'User class';
    }
}

export default User;
