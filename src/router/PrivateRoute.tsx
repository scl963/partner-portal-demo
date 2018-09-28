import React, { SFC, ComponentClass } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

interface Props {
  exact: boolean;
  path: string;
  component: ComponentClass<any>;
  locationId: string;
  locationTitle: string;
}

const PrivateRoute: SFC<Props> = ({
  component: DestinationComponent,
  locationId,
  locationTitle,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <DestinationComponent {...props} locationId={locationId} locationTitle={locationTitle} />
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
