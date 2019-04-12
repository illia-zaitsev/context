import React, { Component } from 'react';
import {ServiceLocator, ServiceLocatorContext} from "../services/locator";
import {StatefulList} from 'baseui/dnd-list';
import QuoteService from "../services/quoteService";
import ItemRenderer from "./itemrenderer";

class Home extends Component<any, any> {

    constructor(props:any) {
        super(props);

        this.state = {
            quotes: []
        }
    }

    componentWillMount(): void {
        const quoteService:QuoteService = (this.context as ServiceLocator).resolve(QuoteService.className) as QuoteService;
        this.setState( {quotes: quoteService.getQuotes()});
    }

    render() {
        return (
            <div className="page-content">
                <div style={{padding: '35px 50px'}}>
                    Watchlist
                </div>
                <div style={{width: '30%', marginTop: '50px'}}>
                    <StatefulList
                        removable
                        initialState={{
                            items: this.state.quotes,
                        }}
                        onChange={console.log}
                        overrides={{
                            Label: {
                                component: (value:any) => (
                                    <ItemRenderer quote={value.$value}/>
                                ),
                            }
                        }}/>
                </div>
            </div>
        )
    }
}

Home.contextType = ServiceLocatorContext;

export default Home;
