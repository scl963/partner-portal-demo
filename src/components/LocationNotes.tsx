import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { LocationData, GenericComponentProps } from '../types';
import { LOCATION_QUERY } from '../queries';
import LoadingPage from './LoadingPage/LoadingPage';
import GenericContainer from './GenericContainer';
import { css } from 'react-emotion';

interface Variables {
  locationId: string;
}

class LocationNotesQuery extends Query<LocationData, Variables> {}

class LocationNotes extends Component<GenericComponentProps> {
  render() {
    return (
      <GenericContainer title={`Location Notes for ${this.props.locationTitle}`}>
        <LocationNotesQuery
          query={LOCATION_QUERY}
          variables={{ locationId: this.props.locationId }}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <LoadingPage />;
            }

            if (error) {
              return `Error! ${error.message}`;
            }

            if (data) {
              return (
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-content: center;
                    height: 70vh;
                    margin: 2em;
                    font-size: 2em;
                    overflow: auto;
                  `}
                >
                  <div>
                    <p>Pickup Notes: {data.Location.pickupNotes}</p>
                  </div>
                  <div>
                    <p>Dropoff Notes: {data.Location.dropOffNotes}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8em', color: 'red' }}>
                      **If these notes are incorrect or incomplete, please call Sheprd customer
                      service at (617) 564-0725**
                    </p>
                  </div>
                </div>
              );
            } else {
              return <p>Error loading notes. Please try refreshing the page</p>;
            }
          }}
        </LocationNotesQuery>
      </GenericContainer>
    );
  }
}

export default LocationNotes;
