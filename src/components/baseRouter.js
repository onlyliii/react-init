import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Date from './date';

const Home = () => (
  <div>
    <h2>Home</h2>
    <Date />
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <div>
      <Link to={`${match.url}/rendering`}>
        Rendering with React
      </Link>
    </div>
    <div>
      <Link to={`${match.url}/components`}>
        Components
      </Link>
    </div>
    <div>
      <Link to={`${match.url}/props-v-state`}>
        Props v. State
      </Link>
    </div>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => (
        <h3>Please select a topic.</h3>
      )}
    />
  </div>
);

const BasicExample = () => (
  <Router>
    <div>
      <p><Link to="/">Home</Link></p>
      <p><Link to="/topics">Topics</Link></p>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

export default BasicExample;
