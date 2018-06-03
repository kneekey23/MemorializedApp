import React, { Component } from 'react'
import MemorializeContract from '../build/contracts/Memorialize.json'
import getWeb3 from './utils/getWeb3'
import { Navbar, Nav, NavItem} from 'react-bootstrap';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deadPersonsValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const memorialize = contract(MemorializeContract)
    memorialize.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var memorializeInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      memorialize.deployed().then((instance) => {
        memorializeInstance = instance

        // Stores a given value, 5 by default.
       // return memorializeInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return memorializeInstance.deadPersons.call()
      }).then((result) => {
        // Update state with the result.
        return this.setState({ deadPersonsValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Memorialize</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            Link
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
        </Nav>
      </Navbar>;

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.deadPersonsValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
