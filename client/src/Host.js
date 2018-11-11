import React, { Component } from 'react';

class Host extends Component {

  constructor() {
    super();
    // init state
    this.state = {
      hostId: '...',
    };
    // bind contexts
    this.setHostId = this.setHostId.bind(this);
    this.getHostId = this.getHostId.bind(this);
  }

  componentDidMount() {
    // set hostId
    this.setHostId();
  };

  setHostId() {
    // call getHostId, set state.hostId with response or show errors
    this.getHostId()
    .then(res => this.setState({ hostId: res }))
    .catch(err => console.log(err));
  };

  getHostId = async () => {
    // call server for hostId
    const response = await fetch('/api/host');
    // store response from server
    const body = await response.json();
    // check for errors
    if (response.status !== 200) {
      // something went wrong
      throw Error(body.message);
    };
    console.log(body.hostId); // DEBUG: log response from server on client
    // response can be returned
    return body.hostId.toString();
  };

  render() {
    return (
      <h2>Host { this.state.hostId }</h2>
    );
  };

};

export default Host;