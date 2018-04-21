import { hot } from 'react-hot-loader';
import * as React from 'react';
import Home from './view/Home';
import Counter from './components/Counter';

import './styles/theme.sass';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Home username="DaftCoder" />
        <Counter
          from={5}
          to={0}
          onSuccess={() => {
            console.log('onSuccess')
            }}
        />
      </main>
    );
  }
}

export default hot(module)(App);
