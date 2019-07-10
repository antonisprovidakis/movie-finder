import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { movieCategoriesRoutingMap } from '../api/config';

const dropdownItemsData = [
  movieCategoriesRoutingMap.popular,
  movieCategoriesRoutingMap.nowPlaying,
  movieCategoriesRoutingMap.upcoming,
  movieCategoriesRoutingMap.topRated
];

function Nav({ isMobile }) {
  return (
    <nav className="Nav">
      <Menu className="Nav__menu" borderless size={isMobile ? 'tiny' : 'large'}>
        <Container>
          <Menu.Item
            header
            fitted={isMobile ? null : 'horizontally'}
            as={Link}
            to="/"
            data-testid="logo"
          >
            <img src="https://react.semantic-ui.com/logo.png" alt="logo" />
          </Menu.Item>
          <Menu.Item fitted="vertically" as={Link} to="/discover">
            Discover
          </Menu.Item>
          <Dropdown item fitted="vertically" text="Movies">
            <Dropdown.Menu>
              {dropdownItemsData.map(({ slug, text }) => (
                <Dropdown.Item as={Link} to={`/movie/${slug}`} key={slug}>
                  {text}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item fitted="vertically" as={Link} to="/person">
            People
          </Menu.Item>
        </Container>
      </Menu>
    </nav>
  );
}

Nav.propTypes = {
  isMobile: PropTypes.bool
};

Nav.defaultProps = {
  isMobile: false
};

export default Nav;
