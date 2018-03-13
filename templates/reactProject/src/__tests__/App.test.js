import React from 'react';
import renderer from 'react-test-renderer';
import App from '../containers/App';

describe('App Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
