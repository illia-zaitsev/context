import React, { Component } from 'react';
import {ALIGN, HeaderNavigation,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList} from "baseui/header-navigation/index";
import User from "../services/user";

interface IHeaderProps {
    user:User;
}

interface IHeaderState {
    balance: number;
}

class Header extends Component<IHeaderProps, IHeaderState> {

    constructor(props:IHeaderProps) {
        super(props);
        this.state = {
            balance: 0
        }
    }

    componentDidMount(): void {
        this.props.user.balance.subscribe((val) => {
            console.log(val);
            this.setState({balance: val})
        })
    }

    render() {

        return (
            <div className="App">
                <HeaderNavigation>
                    <NavigationList align={ALIGN.left}>
                        <NavigationItem>Title</NavigationItem>
                    </NavigationList>
                    <NavigationList align={ALIGN.center} />
                    <NavigationList align={ALIGN.right}>
                        <NavigationItem>
                            Tab Link One
                        </NavigationItem>
                    </NavigationList>
                    <NavigationList align={ALIGN.right}>
                        <NavigationItem style={{width: '200px'}}>
                            {this.state.balance}
                        </NavigationItem>
                    </NavigationList>
                </HeaderNavigation>
            </div>
        )
    }
}

export default Header;
