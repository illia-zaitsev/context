import React, { Component } from 'react';
import {ServiceLocator, ServiceLocatorContext} from "../services/locator";
import Quote from "../domain/quote";
import QuoteService from "../services/quoteService";
import ArrowUp from 'baseui/icon/arrow-up';
import ArrowDown from 'baseui/icon/arrow-down';

interface IRendererProps {
    quote:Quote
}

interface IRendererState {
    name: string
    price: number;
    up: boolean;
}

export default class ItemRenderer extends Component<IRendererProps, IRendererState> {

    // @ts-ignore
    private quoteService:QuoteService;

    constructor(props:any) {
        super(props);

        this.state = {
            name: '',
            price: 0,
            up: true
        };

        this.quoteHandler = this.quoteHandler.bind(this);
    }

    componentWillMount(): void {
        this.quoteService = (this.context as ServiceLocator).resolve(QuoteService.className) as QuoteService;
        this.setState({
            name: this.props.quote.id,
            price: this.props.quote.price
        });
        this.quoteService.addQuoteListener(this.props.quote.id, this.quoteHandler);
    }

    quoteHandler(quote:Quote): void {
        const grow:boolean = (this.state.price < quote.price);
        this.setState({
            price: quote.price,
            up: grow
        });
    }

    componentWillUnmount(): void {
        this.quoteService.removeQuoteListener(this.props.quote.id, this.quoteHandler);
    }

    render() {
        return(
            <div style={{flexGrow: 1, color: (this.state.up) ? 'green' : 'red'}}>
                {this.state.name}
                <span style={{marginLeft: '20px'}}>{this.state.price}{ this.state.up ? <ArrowUp size={16} /> : <ArrowDown size={16} /> }</span>
            </div>

        )
    }
}

ItemRenderer.contextType = ServiceLocatorContext;
