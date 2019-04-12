import React, { Component } from 'react';
import {ServiceLocator, ServiceLocatorContext} from "../services/locator";
import Quote from "../services/vo/quote";
import QuoteService from "../services/quoteService";
import ArrowUp from 'baseui/icon/arrow-up';
import ArrowDown from 'baseui/icon/arrow-down';

interface IPriceProps {
    quote:Quote
}

interface IPriceState {
    price: number;
    up: boolean;
}

export default class PriceComponent extends Component<IPriceProps, IPriceState> {

    // @ts-ignore
    private quoteService:QuoteService;

    constructor(props:any) {
        super(props);

        this.state = {
            price: this.props.quote.price,
            up: true
        };

        this.quoteHandler = this.quoteHandler.bind(this);
    }

    componentWillMount(): void {
        this.quoteService = (this.context as ServiceLocator).resolve(QuoteService.className) as QuoteService;
        this.quoteService.addQuoteListener(this.props.quote.id, this.quoteHandler);
    }

    quoteHandler(quote:Quote): void {
        this.setState({
            price: quote.price,
            up: (this.state.price < quote.price)
        });
    }

    componentWillUnmount(): void {
        this.quoteService.removeQuoteListener(this.props.quote.id, this.quoteHandler);
    }

    render() {
        return <span style={{marginLeft: '20px', color: (this.state.up) ? 'green' : 'red'}}>
                    {this.state.price}
                    {this.state.up ? <ArrowUp size={16} /> : <ArrowDown size={16} /> }
                </span>
    }
}

PriceComponent.contextType = ServiceLocatorContext;
