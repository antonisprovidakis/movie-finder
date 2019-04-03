import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import QuickSearch from './QuickSearch';
import '../styles/Nav.css'
import useMedia, { mobileMediaQuery } from '../utilities/hooks/useMedia';

function Nav(props) {
    const isMobile = useMedia(mobileMediaQuery);

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
            <Container className='Nav__quicksearch-container'>
                <QuickSearch size={isMobile ? 'small' : 'large'} fullWidth fluid />
            </Container>
        </nav>
    );
}

export default Nav;
