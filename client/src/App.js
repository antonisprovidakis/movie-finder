import React from 'react';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Home from './pages/Home';
import People from './pages/People';
import {
  Container,
  Responsive,
} from 'semantic-ui-react'

function renderNonMobileView() {
  return (
    <>
      {/* <Nav /> */}

      <MainContent>
        {/* TODO: router goes in here */}
        <Container>
          <Home />
          {/* <People /> */}
        </Container>
      </MainContent>
    </>
  );
}

function App() {
  return (
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
  );
}

export default App;
