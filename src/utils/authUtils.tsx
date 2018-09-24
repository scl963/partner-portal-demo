import { addDays, isAfter } from 'date-fns';
import { userQuery } from '../common/queries';

const MEMBER_ID = 'member_id';
const LOCATION_ID = 'location_id';
const LOCATION_TITLE = 'location_title';

export function removeAuthToken() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token_expiration');
}

export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_token_expiration', addDays(new Date(), 30).toString());
}

export function isAuthenticated(): boolean {
  const expirationDate = localStorage.getItem('auth_token_expiration');
  return !!expirationDate && isAfter(expirationDate, new Date());
}

export function setMemberId(memberId: string) {
  localStorage.setItem(MEMBER_ID, memberId);
}

export function getMemberId() {
  return localStorage.getItem(MEMBER_ID);
}

export async function handleToken(apolloClient: any, token: string) {
  setAuthToken(token);
  const userQueryResponse = await apolloClient.query({ query: userQuery });
  console.log(userQueryResponse.data);
  const { id, locations } = userQueryResponse.data.user.member;
  setMemberId(id);
  console.log(locations);
}

export function setLocation(locationId: string) {
  localStorage.setItem(LOCATION_ID, locationId);
}

export function getLocation() {
  return localStorage.getItem(LOCATION_ID) || '';
}
