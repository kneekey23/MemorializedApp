import React, { Component } from 'react'
import { Navbar, Nav, NavItem} from 'react-bootstrap';


class NavBarComp extends Component {
  
    render() {
      return (
        <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home">Memorialize</a>
              </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/">
              See Recent Obituaries
            </NavItem>
            <NavItem href="/create">
              Purchase an Obituary
            </NavItem>
          </Nav>
        </Navbar>
  
      );
    }
}
  
  export default NavBarComp
  