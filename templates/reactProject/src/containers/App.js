import React, { Component } from 'react';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!'); // eslint-disable-line
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('AND AWAY. WE. GO.');
  }

  render() {
    return (
      <div>
        <h1>This is my new React App</h1>
      </div>
    );
  }
}

export default App;
