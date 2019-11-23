import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieView from "./components/Movie/MovieView";
import  Bible from './components/Bible/App';
import registerServiceWorker from './registerServiceWorker';
import Spinner from './Spinner';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import firebase from './firebase';
import YouTube  from './YouTube';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser, clearUser } from "./actions";
import VideoChatRoute from "./video-chat-routes";
import BookRoute from "./BookRoute";
import CardRouter from './components/cardRouter';
import NewTestament from "./components/CardQuiz/NewTestament";
import OldTestament from "./components/CardQuiz/OldTestament";
import 'semantic-ui-css/semantic.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.setUser(user);
          this.props.history.push('/');
        } else {
          this.props.history.push('/login');
          this.props.clearUser();
        }
      })
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/bible" component={ Bible} />
        <Route path="/movie" component={MovieView} />
        <Route path="/YouTube" component={YouTube} />
        <Route path="/videochat" component={VideoChatRoute} />
        <Route path="/bookstore" component={BookRoute} />
        <Route path="/BibleGames" component={CardRouter} />
        <Route path="/NewTestamentGames" component={NewTestament} />
        <Route path="/OldTestamentGames" component={OldTestament} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));

ReactDOM.render(
<Provider store={store}>
  <Router>
    <RootWithAuth />
  </Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
