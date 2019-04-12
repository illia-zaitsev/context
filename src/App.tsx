import React, { Component } from 'react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import UserService from "./services/userService";
import Header from "./components/header";
import './App.css';
import QuoteService from "./services/quoteService";
import Footer from "./components/footer";
import Home from "./components/home";
import {ServiceLocator, ServiceLocatorContext} from "./services/locator";


class App extends Component<any, any> {

  protected engine = new Styletron();
  protected locator:ServiceLocator = new ServiceLocator();

  componentWillMount(): void {
    this.locator.register(QuoteService.className, new QuoteService());
    this.locator.register(UserService.className, new UserService());
  }

  render() {
    return (
        <StyletronProvider value={this.engine}>
          <ServiceLocatorContext.Provider value={this.locator}>
            <Header/>
            <Home/>
            <Footer/>
          </ServiceLocatorContext.Provider>
        </StyletronProvider>
    );
  }
}

export default App;
