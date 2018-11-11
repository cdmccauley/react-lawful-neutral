import React, { Component } from 'react';

// react-router-dom imports
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// component imports
import Host from './Host';

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

const Join = (props) => (
  <React.Fragment>
    <h2>Join</h2>
    <form onSubmit={ (event) => {
      event.preventDefault();
      props.isRoomHosted().then((res) => props.history.push(res))
    } }>
      <input type='text' onChange={ props.onJoinChange } />
      <input type='submit' />
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
  <small style={ footerStyle }>{ Date().toLocaleString() }</small>
);

// app definition
class App extends Component {

  constructor() {
    super();
    // init state
    this.state = {
      roomId: ''
    };
    // bind context
    //this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
    this.onJoinChange = this.onJoinChange.bind(this);
    this.isRoomHosted = this.isRoomHosted.bind(this);
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     response: '',
  //     post: '',
  //     responseToPost: '',
  //   };
  // };

  // componentDidMount() {
  //   this.callApi()
  //   .then(res => this.setState({ response: JSON.stringify(res.key) }))
  //   .catch(err => console.log(err));
  // };

  // callApi = async () => {
  //   const response = await fetch('/api/join');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/host', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
  //   this.setState({ responseToPost: body });
  // };

  isRoomHosted = async () => {
    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.roomId }),
    });
    const body = await response.json();
    let roomUrl = `/room/${ body.roomId }`;
    //console.log(roomUrl);
    return roomUrl;
  }

  // handleJoinSubmit = (event) => {
  //   event.preventDefault();
  //   this.isRoomHosted().then((res) => console.log(res)).then((res) => this.history.push(res));
  // }

  // handleJoinSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await fetch('/api/join', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.roomId }),
  //   });
  //   const body = await response.json();
  //   let roomUrl = `/room/${ body.roomId }`;
  //   console.log(roomUrl);
  //   return roomUrl;
  // };

  onJoinChange = (event) => {
    this.setState({
      roomId: event.target.value
    });
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/host' component={ Host } />
            <Route exact path='/join' render={ (props) => <Join { ...props } onJoinChange={ this.onJoinChange } isRoomHosted={ this.isRoomHosted } /> } />
            <Route exact path='/room/:id' component={ Room } />
            {/* <div>
              <p>{ this.state.response }</p>
              <form onSubmit={ this.handleSubmit }>
                <p>
                  <strong>POST to server:</strong>
                </p>
                <input type="text" value={ this.state.post } onChange={ e => this.setState({ post: e.target.value })} />
                <button type="submit">Submit</button>
              </form>
              <p>{ this.state.responseToPost }</p>
            </div> */}
            <Route render={ () => <h2>Page not found</h2> } />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
