import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import QuickSearch from './components/QuickSearch';
import Footer from './components/Footer';
import useMedia, { mobileMediaQuery } from './utils/hooks/useMedia';

const Homepage = lazy(() => import('./pages/HomePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const PersonsPage = lazy(() => import('./pages/PersonsPage'));
const PersonPage = lazy(() => import('./pages/PersonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App(props) {
  const isMobile = useMedia(mobileMediaQuery);

  return (
    <Router>
      <div className="App">
        <Nav isMobile={isMobile} />

        <MainContent className='App__main-content'>
          <QuickSearch className='App__quicksearch' size={isMobile ? 'small' : 'large'} fullWidth fluid />

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/' render={(props) => <Homepage {...props} />} />
              <Route exact sensitive path='/discover' render={(props) => <DiscoverPage {...props} />} />
              <Route exact sensitive path='/movie/:category(popular|upcoming|in-theaters|top-rated)' render={(props) => <MoviesPage {...props} />} />
              <Route exact sensitive path='/movie/:id([1-9]\d{0,})' render={(props) => <MoviePage {...props} />} />
              <Route exact sensitive path='/person' render={(props) => <PersonsPage {...props} />} />
              <Route exact sensitive path='/person/:id([1-9]\d{0,})' render={(props) => <PersonPage {...props} />} />
              <Route render={(props) => <NotFoundPage {...props} />} />
            </Switch>
          </Suspense>
        </MainContent>

        <Footer />
      </div >
    </Router>
  );
}

export default App;
