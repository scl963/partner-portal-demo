import React, { SFC, ComponentClass } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

interface Props {
  exact: boolean;
  path: string;
  component: ComponentClass<any>;
}

const PrivateRoute: SFC<Props> = ({ component: DestinationComponent, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <DestinationComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
