import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import {
  Container,
  Responsive,
} from 'semantic-ui-react'

import Home from './pages/Home';
import Discover from './pages/Discover';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import People from './pages/People';
import Person from './pages/Person';
import NotFound from './pages/NotFound';


function renderNonMobileView() {
  return (
    <>
      {/* <Nav /> */}

      <MainContent>
        {/* TODO: router goes in here */}
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/discover' component={Discover} />
            <Route exact path='/movies/:type(popular|upcoming|in-theaters|top-100)' component={Movies} />
            <Route exact path='/movies/:id' component={Movie} />
            <Route exact path='/people' component={People} />
            <Route exact path='/people/:id' component={Person} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </MainContent>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Responsive as={React.Fragment} maxWidth={Responsive.onlyMobile.maxWidth}>
          <div style={{ backgroundColor: 'red', zIndex: 9999, position: 'absolute', top: '4rem', left: 0, right: 0, fontSize: 24, height: 32 }}>
            Mobile view not yes implemented
            </div>
          {/*
              TODO: mobile view will be rendered here
            */}
          {/* {renderMobileView()} */}
          {renderNonMobileView()}
        </Responsive>

        <Responsive as={React.Fragment} minWidth={Responsive.onlyTablet.minWidth}>
          {renderNonMobileView()}
        </Responsive>

      </div >
    </Router>
  );
}

export default App;
