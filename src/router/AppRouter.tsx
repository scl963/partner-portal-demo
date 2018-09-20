import React, { Component, SFC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Link,
  withRouter,
} from 'react-router-dom';
import { Layout, Menu, Avatar, Icon, Button } from 'antd';
import RidesTableContainer from '../components/RidesTable/RidesTableContainer';
import Login from '../components/Login/Login';
import { removeAuthToken, setAuthToken, isAuthenticated } from '../utils/authUtils';
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
    this.setState(toggleIsAuthenticated);
  };

  private renderMenuBar = () => (
    <Layout.Header
      style={{ width: '100%', background: 'white', display: 'inline', paddingLeft: '25px' }}
    >
      <Avatar src={SheprdIcon} shape="square" />
      <img src={SheprdLogo} width="66px" height="20px" />
    </Layout.Header>
  );

  render() {
    return (
      <Layout>
        {this.renderMenuBar()}
        <Layout.Content>
          <Route exact={true} path="/login" component={Login} />
          <Route path="/dailyRoster" component={RidesTableContainer} />
        </Layout.Content>
      </Layout>
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
