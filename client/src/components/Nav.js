import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Container, Icon, Responsive, Dropdown } from 'semantic-ui-react';
import QuickSearch from './QuickSearch';
import '../styles/Nav.css'

function Nav(props) {
    function renderMenuItems() {
        return (
            <>
                <Responsive as={React.Fragment} maxWidth={Responsive.onlyMobile.maxWidth}>
                    <Menu.Item>
                        <Icon
                            name='sidebar'
                            size='large'
                            link
                            fitted
                        />
                    </Menu.Item>
                </Responsive>

                <Menu.Item header as={Link} to='/' >
                    <img src='https://react.semantic-ui.com/logo.png' alt="logo" />
                </Menu.Item>

                <Responsive as={React.Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu.Item as={Link} to='/discover'>Discover</Menu.Item>
                    <Dropdown
                        item
                        text='Movies'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/movie/popular'>Popular</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/movie/in-theaters'>In Theaters</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/movie/upcoming'>Upcoming</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/movie/top-rated'>Top Rated</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item as={Link} to='/person'>People</Menu.Item>
                    <Menu.Item position='right' fitted>
                        <QuickSearch fluid />
                    </Menu.Item>
                </Responsive>
            </>
        );
    }

    // TODO: make nav 'sticky'
    return (
        <Menu
            fixed='top'
            className="Nav"
            as="nav"
            borderless
            {...props}
        >
            <Container>
                {renderMenuItems()}
            </Container>
        </Menu>
    );
}

export default Nav;
