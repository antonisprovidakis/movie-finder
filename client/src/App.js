import React, { lazy, Suspense } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Loader from './components/Loader';
import MainContent from './components/MainContent';
import Nav from './components/Nav';
import QuickSearch from './components/QuickSearch';
import { movieCategoriesRoutingMap } from './api/config';
import useMedia, { mobileMediaQuery } from './utils/hooks/useMedia';

const Homepage = lazy(() => import('./pages/HomePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const PersonsPage = lazy(() => import('./pages/PersonsPage'));
const PersonPage = lazy(() => import('./pages/PersonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const moviesPageValidPaths = [
  movieCategoriesRoutingMap.popular.slug,
  movieCategoriesRoutingMap.upcoming.slug,
  movieCategoriesRoutingMap.nowPlaying.slug,
  movieCategoriesRoutingMap.topRated.slug
].join('|');

function App(props) {
  const isMobile = useMedia(mobileMediaQuery);

  return (
    <div className="App">
      <Nav isMobile={isMobile} />

      <MainContent className="App__main-content">
        <QuickSearch
          className="App__quicksearch"
          size={isMobile ? 'small' : 'large'}
          fullWidth
          fluid
        />

        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact sensitive path="/discover" component={DiscoverPage} />
            <Route
              exact
              sensitive
              path={`/movie/:category(${moviesPageValidPaths})`}
              component={MoviesPage}
            />
            <Route
              exact
              sensitive
              path="/movie/:id([1-9]\d{0,})"
              component={MoviePage}
            />
            <Route exact sensitive path="/person" component={PersonsPage} />
            <Route
              exact
              sensitive
              path="/person/:id([1-9]\d{0,})"
              component={PersonPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </MainContent>

      <Footer />
    </div>
  );
}

export default App;
