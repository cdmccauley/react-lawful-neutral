import React, { Component } from 'react';

// react-router-dom imports
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// stateless component definitions
const Header = () => <h1>Lawful Neutral</h1>;

const Home = () => (
  <React.Fragment>
    <h2>Home</h2>
    <Link to="/host">Host</Link>
    <br />
    <Link to="/join">Join</Link>
  </React.Fragment>
);

const Host = () => <h2>Host</h2>;

const Join = (props) => (
  <React.Fragment>
    <h2>Join</h2>
    <form>
      <input type='text' id='room-id' />
      <input type='submit' value='Join' 
        onClick={ (event) => {
          event.preventDefault();
          let roomId = document.getElementById('room-id').value;
          props.history.push(`/join/${ roomId }`); 
        } }
      />
    </form>
  </React.Fragment>
);

const Room = (props) => (
  <React.Fragment>
    <h2>Room { props.match.params.id }</h2>
  </React.Fragment>
);

const footerStyle = {
  bottom: '1em',
  right: '1em',
  position: 'fixed',
}
const Footer = () => (
  <small style={ footerStyle }>
    { new Date().toLocaleString() }
  </small>
);

// app definition
class App extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Route exact path='/' component={ Home } />
          <Route path='/host' component={ Host } />
          <Route path='/join/:id' component={ Room } />
          <Route exact path='/join' component={ Join } />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
