import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Container, Dropdown, Menu, } from 'semantic-ui-react';

function Nav({ isMobile }) {
    return (
        <nav className="Nav">
            <Menu
                className='Nav__menu'
                borderless
                size={isMobile ? 'tiny' : 'large'}
            >
                <Container>
                    <Menu.Item header fitted={isMobile ? null : 'horizontally'} as={Link} to='/' >
                        <img src='https://react.semantic-ui.com/logo.png' alt="logo" />
                    </Menu.Item>
                    <Menu.Item fitted='vertically' as={Link} to='/discover'>Discover</Menu.Item>
                    <Dropdown
                        item
                        fitted='vertically'
                        text='Movies'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/movie/popular'>Popular</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/movie/in-theaters'>In Theaters</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/movie/upcoming'>Upcoming</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/movie/top-rated'>Top Rated</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item fitted='vertically' as={Link} to='/person'>People</Menu.Item>
                </Container>
            </Menu>
        </nav>
    );
}

Nav.propTypes = {
    isMobile: PropTypes.bool
}

Nav.defaultProps = {
    isMobile: false
}

export default Nav;
