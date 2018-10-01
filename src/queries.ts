import gql from 'graphql-tag';

export const DRIVER_QUERY = gql`
  query {
    allMembers(
      orderBy: lastName_ASC
      filter: { driverStatus: Active, firstName_gt: "", lastName_gt: "" }
    ) {
      id
      firstName
      lastName
    }
  }
`;

// Omitting id from query because otherwise it causes errors if you switch between this and the
// daily roster component. Apollo tries to cache both under the location id
// but the data is different
export const LOCATION_QUERY = gql`
  query locationQuery($locationId: ID!) {
    Location(id: $locationId) {
      pickupNotes
      dropOffNotes
    }
  }
`;

export const USER_LOCATIONS_QUERY = (memberId: string | null) => `
  query {
    Member(id: "${memberId}"){
      locations{
        id
        title
      }
    }
  }
`;
