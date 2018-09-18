import moment from 'moment';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { Data } from '../types';
import RidesTable from './RidesTable';

const today: string = moment().format('YYYY-MM-DD');
const tomorrow = moment()
  .add(1, 'day')
  .format('YYYY-MM-DD');

const RIDES_QUERY = gql`
  query ridesQuery($start: DateTime!, $end: DateTime!) {
    Location(id: "cjl2mqtpe230e0160u1wn2zgx") {
      title
      pickupRides(filter: { pickupRangeStart_gt: $start, pickupRangeStart_lt: $end }) {
        id
        route {
          id
          shift {
            id
            vehicles {
              id
              carName
            }
            members {
              id
              firstName
            }
          }
        }
        pickupRangeStart
        pickupRangeEnd
        pickupMember {
          id
          firstName
          lastName
        }
      }
      dropOffRides(filter: { pickupRangeStart_gt: $start, pickupRangeStart_lt: $end }) {
        id
        route {
          id
          shift {
            id
            vehicles {
              id
              carName
            }
            members {
              id
              firstName
            }
          }
        }
        pickupRangeStart
        pickupRangeEnd
        pickupMember {
          firstName
          lastName
        }
      }
    }
  }
`;

interface Variables {
  start: string;
  end: string;
}

class AllMembersMetaQuery extends Query<Data, Variables> {}

const RidesTableContainer = () => (
  <AllMembersMetaQuery query={RIDES_QUERY} variables={{ start: today, end: tomorrow }}>
    {({ loading, data, error }) => {
      if (loading) {
        return 'Loading...';
      }

      if (error) {
        return `Error! ${error.message}`;
      }

      console.log(data);
      if (data) {
        return (
          <div>
            <div>{data.Location.title} Daily Roster</div>
            <RidesTable data={data} />
          </div>
        );
      } else {
        return <div>There is no data to display</div>;
      }
    }}
  </AllMembersMetaQuery>
);

export default RidesTableContainer;
