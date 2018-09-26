import React, { Component, SFC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { Layout, Avatar, Button, Menu } from 'antd';
import RidesTableContainer from '../components/RidesTable/RidesTableContainer';
import Login from '../components/Login/Login';
import { removeAuthToken, isAuthenticated } from '../utils/authUtils';
import PrivateRoute from './PrivateRoute';
import DriverList from '../components/DriverList/DriverList';
import SheprdIcon from '../common/img/sheprd_icon.png';
import SheprdLogo from '../common/img/sheprd_logo.png';

type State = Readonly<{ isAuthenticated: boolean }>;

const toggleIsAuthenticated = (prevState: State): State => ({
  ...prevState,
  isAuthenticated: !prevState.isAuthenticated,
});

class AppLayout extends Component<RouteComponentProps<{}>, State> {
  state: State = { isAuthenticated: isAuthenticated() };

  private toggleIsAuthenticated = () => this.setState(toggleIsAuthenticated);

  private logout = () => {
    removeAuthToken();
    localStorage.clear();
    this.setState(toggleIsAuthenticated);
  };

  private renderMenuBar = () => (
    <Layout.Header
      style={{ width: '100%', background: 'white', display: 'inline', paddingLeft: '25px' }}
    >
      <Avatar src={SheprdIcon} shape="square" />
      <img src={SheprdLogo} width="66px" height="20px" />
      <Button onClick={this.logout} style={{ float: 'right', marginTop: '15px' }}>
        Log Out
      </Button>
    </Layout.Header>
  );

  render() {
    return (
      <div>
        <Route
          path="/login"
          exact={true}
          render={props => <Login onAuthenticated={this.toggleIsAuthenticated} {...props} />}
        />
        <Layout>
          {isAuthenticated() && this.renderMenuBar()}
          <Layout.Content>
            <PrivateRoute exact={true} path="/daily-roster" component={RidesTableContainer} />
            <PrivateRoute exact={true} path="/driver-list" component={DriverList} />
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

const AppContent = withRouter(AppLayout as any);

const AppRouter: SFC<object> = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRouter;
