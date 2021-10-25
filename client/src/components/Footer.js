import React from 'react';
import '../styles/Footer.css';
import { Container } from 'semantic-ui-react';
import tmdbLogoPowered from '../assets/images/tmdb-logo-powered.png';

function Footer(props) {
  return (
    <footer className="Footer">
      <Container>
        <div className="Footer__content">
          <div>
            A project by Antonis Providakis&nbsp;|&nbsp;
            <a
              href="https://github.com/antonisprovidakis/movie-finder"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div>
            Movie Finder uses the
            <a
              href="https://www.themoviedb.org/documentation/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;TMDb API&nbsp;
            </a>
            but is not endorsed or certified by TMDb.
          </div>
          <div className="Footer__content__tmdb-logo-container">
            <img src={tmdbLogoPowered} alt="tmdb logo" />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
