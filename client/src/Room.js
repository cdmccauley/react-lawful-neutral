import React, { Component } from 'react';

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.match.params.id,
      clientPeerConn: null,
    };
  };

  componentDidMount() {
    // DEBUG: WebRTC testing
    let servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca', 'credential': 'webrtc', 'username': 'cdmccauley@gmail.com'}]};
    let tempClientPeerConn = new RTCPeerConnection(servers);
    tempClientPeerConn.onicecandidate = (event => event.candidate ? console.log(event.candidate) : console.log(event));
    console.log(tempClientPeerConn);
    tempClientPeerConn.createOffer().then(offer => console.log(offer));
    // tempClientPeerConn.createAnswer().then(answer => console.log(answer)); // need have-remote-offer or have-local-pranswer
    // END DEBUG: WebRTC testing
  };

  render() {
    return(
      <h2>Room { this.state.roomId }</h2>
    );
  };
};

export default Room;