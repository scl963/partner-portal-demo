import gql from 'graphql-tag';

export const RIDES_QUERY = gql`
  query ridesQuery($start: DateTime!, $end: DateTime!, $locationId: ID!) {
    Location(id: $locationId) {
      title
      pickupRides(filter: { pickupRangeStart_gt: $start, pickupRangeStart_lt: $end }) {
        id
        status
        route {
          id
          shift {
            id
            vehicles {
              id
              carName
              licensePlate
            }
            members {
              id
              firstName
              lastName
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
        status
        route {
          id
          shift {
            id
            vehicles {
              id
              carName
              licensePlate
            }
            members {
              id
              firstName
              lastName
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

export const DRIVER_QUERY = gql`
  query {
    allMembers(filter: { driverStatus: Active, firstName_gt: "", lastName_gt: "" }) {
      id
      firstName
      lastName
    }
  }
`;
