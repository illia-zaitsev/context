import React, { Component } from 'react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import User from "./services/user";
import Header from "./components/header";
import './App.css';

class App extends Component<any, any> {

  private engine = new Styletron();
  private user = new User();

  render() {
    return (
        <StyletronProvider value={this.engine}>
            <Header user={this.user} />
        </StyletronProvider>
    );
  }
}

export default App;
