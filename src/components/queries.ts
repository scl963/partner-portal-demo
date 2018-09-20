import gql from 'graphql-tag';

export const RIDES_QUERY = gql`
  query ridesQuery($start: DateTime!, $end: DateTime!) {
    Location(id: "cj294mriiq7bk0179n9qxb1q1") {
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
        status
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
