import gql from 'graphql-tag';

const RIDES_QUERY = gql`
  query {
    Location(id: "cjl2mqtpe230e0160u1wn2zgx") {
      title
      pickupRides {
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
      dropOffRides {
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

export default RIDES_QUERY;
