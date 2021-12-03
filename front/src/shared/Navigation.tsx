import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse,
    Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem,
    NavbarText
} from 'reactstrap';

import './Navigation.css';
import '../components/Login';

const Navigation = () => {
    return (
        <div className="DNavbar">
            <Navbar className="Navbar"
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                <span className="DNavbarBrand">Count of Money</span>
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                <Nav
                    className="me-auto"
                    navbar
                >
                    <NavItem>
                        <NavLink href="Watchlist">
                            Watchlist
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="Market">
                            Market
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="Settings">
                            Settings
                        </NavLink>
                    </NavItem>
                    <UncontrolledDropdown
                    inNavbar
                    nav
                    >
                        <DropdownToggle
                            caret
                            nav
                        >
                            Account
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink href="Login">
                                        Login
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink href="Register">
                                        Register
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                Info
                                </DropdownItem>
                            </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>
                    Hi <span className="SEmail">'email'</span> !
                </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;