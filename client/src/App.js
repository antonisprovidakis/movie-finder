import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import { Container, } from 'semantic-ui-react'
import Footer from './components/Footer';

const Homepage = lazy(() => import('./pages/HomePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const PersonsPage = lazy(() => import('./pages/PersonsPage'));
const PersonPage = lazy(() => import('./pages/PersonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App(props) {
  return (
    <Router>
      <div className="App">
        <Nav />

        <MainContent>
          <Container>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path='/' render={(props) => <Homepage {...props} />} />
                <Route exact path='/discover' render={(props) => <DiscoverPage {...props} />} />
                <Route exact path='/movie/:category(popular|upcoming|in-theaters|top-rated)' render={(props) => <MoviesPage {...props} />} />
                <Route exact path='/movie/:id' render={(props) => <MoviePage {...props} />} />
                <Route exact path='/person' render={(props) => <PersonsPage {...props} />} />
                <Route exact path='/person/:id' render={(props) => <PersonPage {...props} />} />
                <Route render={(props) => <NotFoundPage {...props} />} />
              </Switch>
            </Suspense>
          </Container>
        </MainContent>

        <Footer />
      </div >
    </Router>
  );
}

export default App;
