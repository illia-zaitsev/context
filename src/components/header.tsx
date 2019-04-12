import React, {Component} from 'react';
import {
    ALIGN, HeaderNavigation,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList
} from "baseui/header-navigation/index";
import UserService from "../services/userService";
import {ServiceLocator, ServiceLocatorContext} from "../services/locator";
import BalanceComponent from "./balanceComponent";

interface IHeaderProps {
}

interface IHeaderState {
    balance: number;
}

class Header extends Component<IHeaderProps, IHeaderState> {

    // @ts-ignore
    private userService: UserService;

    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            balance: 0
        };
    }

    componentWillMount(): void {
        this.userService = (this.context as ServiceLocator).resolve(UserService.className) as UserService;
        this.userService.balance.subscribe((val) => {
            this.setState({balance: val})
        })
    }

    render() {
        return (
            <div className="page-header">
                <HeaderNavigation>
                    <NavigationList align={ALIGN.left}>
                        <NavigationItem><span style={{fontSize: '2em'}}>Quotes</span></NavigationItem>
                    </NavigationList>
                    <NavigationList align={ALIGN.center}/>
                    <NavigationList align={ALIGN.right}>
                        <NavigationItem style={{width: '180px'}}>
                            My balance: ${this.state.balance}
                        </NavigationItem>
                    </NavigationList>
                </HeaderNavigation>
            </div>
        )
    }
}

Header.contextType = ServiceLocatorContext;

export default Header;
