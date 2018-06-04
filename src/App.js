import React, { Component } from 'react'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import {Grid} from 'react-bootstrap'
import NavBarComp from './components/navigation'

class App extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

  }



  render() {
    return (
      <div className="app">
       <NavBarComp />
       <Grid id="content">
          {
            React.cloneElement(
              this.props.children
            )
          }
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App
