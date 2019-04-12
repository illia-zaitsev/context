import React, { Component } from 'react';
import {Observable} from 'rxjs';

interface IBalanceProps {
    balance:Observable<any>
}

interface IBalanceState {
    balance: number;
}

export default class BalanceComponent extends Component<IBalanceProps, IBalanceState> {

    constructor(props:any) {
        super(props);

        this.state = {
            balance: 0
        };
    }

    componentWillMount(): void {
        this.props.balance.subscribe((val) => {
            this.setState({balance: val})
        })
    }

    render() {
        return  <span>
                    My balance: ${this.state.balance}
                </span>
    }
}
