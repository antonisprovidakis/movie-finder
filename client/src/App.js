import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import { Container, } from 'semantic-ui-react'
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Discover = lazy(() => import('./pages/Discover'));
const Movies = lazy(() => import('./pages/Movies'));
const Movie = lazy(() => import('./pages/Movie'));
const People = lazy(() => import('./pages/People'));
const Person = lazy(() => import('./pages/Person'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App(props) {
  return (
    <Router>
      <div className="App">
        <Nav />

        <MainContent>
          <Container>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path='/' render={(props) => <Home {...props} />} />
                <Route exact path='/discover' render={(props) => <Discover {...props} />} />
                <Route exact path='/movie/:category(popular|upcoming|in-theaters|top-rated)' render={(props) => <Movies {...props} />} />
                <Route exact path='/movie/:id' render={(props) => <Movie {...props} />} />
                <Route exact path='/person' render={(props) => <People {...props} />} />
                <Route exact path='/person/:id' render={(props) => <Person {...props} />} />
                <Route render={(props) => <NotFound {...props} />} />
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
