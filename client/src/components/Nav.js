import React from 'react';
import { Menu, Container, Icon, Dropdown, Responsive } from 'semantic-ui-react';
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

                <Menu.Item header link>
                    <img src='https://react.semantic-ui.com/logo.png' alt="logo" />
                </Menu.Item>

                <Responsive as={React.Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu.Item name='discover' link>Discover</Menu.Item>
                    <Dropdown
                        icon={null}
                        item
                        simple
                        text='Movies'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item>Popular</Dropdown.Item>
                            <Dropdown.Item>In Theaters</Dropdown.Item>
                            <Dropdown.Item>Upcoming</Dropdown.Item>
                            <Dropdown.Item>Top 100</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Menu.Item name='movies' link>Movies</Menu.Item> */}
                    <Menu.Item name='people' link>People</Menu.Item>
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
