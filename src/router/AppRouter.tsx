import React, { Component, SFC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  withRouter,
  Link,
  Redirect,
} from 'react-router-dom';
import { Layout, Avatar, Button, Menu, Row, Dropdown, Icon } from 'antd';
import { css } from 'react-emotion';
import RidesTableContainer from '../components/RidesTable/RidesTableContainer';
import Login from '../components/Login/Login';
import { removeAuthToken, isAuthenticated, getMemberId } from '../utils/authUtils';
import PrivateRoute from './PrivateRoute';
import SheprdIcon from '../common/img/sheprd_icon.png';
import SheprdLogo from '../common/img/sheprd_logo.png';
import DriverList from '../components/DriverList';
import LocationNotes from '../components/LocationNotes';
import axios from 'axios';
import { ApolloClient } from 'apollo-client';
import { USER_LOCATIONS_QUERY } from '../queries';
import { MemberLocationResponse, Location } from '../types';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import MenuItem from 'antd/lib/menu/MenuItem';

const env = runtimeEnv();

// This style is used to override Ant styling on disabled items
const navItemDisabledStyle = css`
  cursor: default !important;
  margin-top: -3px !important;
  margin-bottom: 0px !important;
  font-weight: 10px;
  .ant-menu-item-disabled {
    color: black !important;
  }
`;

type State = Readonly<{
  isAuthenticated: boolean;
  currLocationId: string;
  currLocationTitle: string;
  allLocations: Location[];
}>;

const toggleIsAuthenticated = (prevState: State): State => ({
  ...prevState,
  isAuthenticated: !prevState.isAuthenticated,
});

type RouterProps = RouteComponentProps<any> & { client: ApolloClient<MemberLocationResponse> };

class AppLayout extends Component<RouterProps, State> {
  state: State = {
    isAuthenticated: isAuthenticated(),
    currLocationId: '',
    currLocationTitle: '',
    allLocations: [],
  };

  // Fetches list of member's owned locations to allow switching between them
  async fetchAllMemberLocations() {
    const memberId = getMemberId();
    if (memberId) {
      try {
        if (process.env.REACT_APP_GRAPH_ENDPOINT) {
          const { data } = await axios.post(env.REACT_APP_GRAPH_ENDPOINT, {
            query: USER_LOCATIONS_QUERY(memberId),
          });
          const { locations } = data.data.Member;
          const { id: currLocationId, title: currLocationTitle } = locations[0];
          this.setState({ allLocations: locations, currLocationId, currLocationTitle });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  // Prevent call if on login screen but do call if logged in user comes back to site without going
  // through login
  componentDidMount() {
    return isAuthenticated() && this.fetchAllMemberLocations();
  }

  // Check to see if user was not logged in previously -- this is used to trigger location fetch on
  // redirect from login
  getSnapshotBeforeUpdate(prevProps: any, prevState: State) {
    if (!prevState.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }

  // Only trigger location fetch on login
  componentDidUpdate(prevProps: any, prevState: State, snapshot: any) {
    if (snapshot) {
      this.fetchAllMemberLocations();
    }
  }

  private toggleIsAuthenticated = () => this.setState(toggleIsAuthenticated);

  private changeLocation = (locationId: string, locationTitle: string) => {
    const { currLocationId } = this.state;
    if (locationId === currLocationId) {
      return;
    } else {
      this.setState({ currLocationId: locationId, currLocationTitle: locationTitle });
    }
  };

  private logout = () => {
    removeAuthToken();
    localStorage.clear();
    this.setState(toggleIsAuthenticated);
  };

  private renderMenuBar = () => {
    const { allLocations } = this.state;
    return (
      <Layout.Header
        className={css`
          background: white;
          position: fixed;
          height: 50px !important;
          z-index: 1;
          width: 100%;
          padding: 0;
          overflow-x: ;
        `}
      >
        <Row>
          <Menu mode="horizontal" style={{ height: '50px', whiteSpace: 'normal' }}>
            <Menu.Item disabled={true} className={navItemDisabledStyle}>
              <Avatar src={SheprdIcon} shape="square" style={{ marginLeft: '1em' }} />
              <img src={SheprdLogo} width="66px" height="20px" />
            </Menu.Item>
            <Menu.Item>
              <Link to="daily-roster">Daily Roster</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/driver-list">Driver List</Link>
            </Menu.Item>
            <Menu.Item key="notes">
              <Link to={'location-notes'}>Location Notes</Link>
            </Menu.Item>
            {allLocations.length > 1 ? (
              <Menu.SubMenu
                key="myLocation"
                title={
                  <span>
                    Change Location <Icon type="down" />
                  </span>
                }
              >
                {allLocations.map(l => {
                  return (
                    <Menu.Item key={l.id} onClick={() => this.changeLocation(l.id, l.title)}>
                      {l.title}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              ''
            )}
            {this.state.currLocationTitle ? (
              <MenuItem id="locationTitle" disabled={true} className={navItemDisabledStyle}>
                <span style={{ color: 'black', fontWeight: 'bold' }}>
                  {this.state.currLocationTitle}
                </span>
              </MenuItem>
            ) : (
              ''
            )}
            <Menu.Item
              className={css`
                margintop: 3px;
                float: right;
                border-bottom: 0 !important;
              `}
            >
              <Button onClick={this.logout}>Log Out</Button>
            </Menu.Item>
          </Menu>
        </Row>
      </Layout.Header>
    );
  };

  render() {
    const { currLocationTitle, currLocationId, allLocations } = this.state;
    return (
      <div>
        <Route
          path="/login"
          exact={true}
          render={props => <Login onAuthenticated={this.toggleIsAuthenticated} {...props} />}
        />
        {isAuthenticated() ? (
          <Layout>
            {isAuthenticated() && this.renderMenuBar()}
            <Layout.Content
              className={css`
                margin-top: 50px;
                padding: 16px;
              `}
            >
              <PrivateRoute
                exact={true}
                path="/"
                component={RidesTableContainer}
                locationId={currLocationId}
                locationTitle={currLocationTitle}
              />
              <PrivateRoute
                exact={true}
                path="/daily-roster"
                component={RidesTableContainer}
                locationId={currLocationId}
                locationTitle={currLocationTitle}
              />
              <PrivateRoute
                exact={true}
                path="/driver-list"
                component={DriverList}
                locationId={currLocationId}
                locationTitle={currLocationTitle}
              />
              <PrivateRoute
                exact={true}
                path="/location-notes"
                component={LocationNotes}
                locationId={currLocationId}
                locationTitle={currLocationTitle}
              />
            </Layout.Content>
          </Layout>
        ) : (
          <Redirect to="/login" />
        )}
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
