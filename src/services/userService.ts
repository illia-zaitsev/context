import {Observable} from 'rxjs';
import utils from "../utils/utils";

class UserService {

    // name

    static className = 'UserService';

    //
    // Variables
    //

    private _balance:Observable<any> = utils.randomTimeRunFunction(1000, 500, 3000,
        () => utils.randomize(1100, 1150));

    get balance():Observable<any> {
        return this._balance;
    }
}

export default UserService;
