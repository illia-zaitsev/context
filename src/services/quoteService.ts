import Quote from "../domain/quote";
import utils from "../utils/utils";

class QuoteService {

    // name

    static className = 'QuoteService';

    //
    // Variables
    //

    private _listeners = new Map();
    private _quotes:Quote[] = this.generateQuotes();

    constructor() {
        this.startGeneratingQuotesPrice();
    }

    private generateQuotes() {
        const list:string[] = utils.getQuoteSet();
        return list.map((id:string) => new Quote(id, utils.randomize(1, 1000)/1000));
    }

    private startGeneratingQuotesPrice() {
       utils.randomTimeRunFunction(100, 50, 1000,
           () => utils.randomize(0, this._quotes.length-1)
       ).subscribe((quoteIndex) => {
           const quote = this._quotes[quoteIndex];
           const randomDiff = (quote.price/utils.randomize(10, 100) * (utils.randomize(0,1) ? -1 : 1));
           quote.price += randomDiff;
           quote.price = parseFloat(quote.price.toFixed(6));
           this.onUpdateQuoteHandler(quote);
       });
    }

    private onUpdateQuoteHandler(quote:Quote) {
        if (this._listeners.has(quote.id)) {
            const set = this._listeners.get(quote.id) as Set<Function>;
            set.forEach((handler) => {
                handler(quote);
            })
        }
    }

    //
    // Public methods
    //

    getQuotes():Quote[] {
        return this._quotes;
    }

    addQuoteListener(id:string, handler:Function):void {
        if (!this._listeners.has(id)) {
            this._listeners.set(id, new Set());
        }
        this._listeners.get(id).add(handler);
    }

    removeQuoteListener(id:string, handler:Function):void {
        if (this._listeners.has(id)) {
            const set = this._listeners.get(id) as Set<Function>;
            set.delete(handler);
        }
    }
}

export default QuoteService;
