import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import {
  Container,
  Responsive,
} from 'semantic-ui-react'
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Discover = lazy(() => import('./pages/Discover'));
const Movies = lazy(() => import('./pages/Movies'));
const Movie = lazy(() => import('./pages/Movie'));
const People = lazy(() => import('./pages/People'));
const Person = lazy(() => import('./pages/Person'));
const NotFound = lazy(() => import('./pages/NotFound'));

function DesktopContainer({ children }) {
  return (
    <Responsive as={React.Fragment} minWidth={Responsive.onlyTablet.minWidth}>
      <Nav />

      {children}

      <Footer />
    </Responsive>
  );
}

function MobileContainer({ children }) {
  return (
    <Responsive as={React.Fragment} maxWidth={Responsive.onlyMobile.maxWidth}>
      {/* TODO: render custom mobile view here */}
      <div style={{ backgroundColor: 'red', zIndex: 9999, position: 'absolute', top: '4rem', left: 0, right: 0, fontSize: 24, height: 32 }}>
        Warning: Mobile view not yet implemented
      </div>

      <Nav />

      {children}

      <Footer />
    </Responsive>
  );
}

function ResponsiveContainer({ children }) {
  return (
    <>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </>
  );
}

function App(props) {
  return (
    <Router>
      <div className="App">

        <ResponsiveContainer>
          <MainContent>
            {/* TODO: router goes in here */}
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
        </ResponsiveContainer>

      </div >
    </Router>
  );
}

export default App;
