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
  const token = localStorage.getItem('auth_token');
  // const expirationDate = localStorage.getItem('auth_token_expiration');
  // return !!expirationDate && isAfter(expirationDate, new Date());
  return token ? true : false;
}

export function setMemberId(memberId: string) {
  localStorage.setItem(MEMBER_ID, memberId);
}

export function getMemberId() {
  return localStorage.getItem(MEMBER_ID);
}

export async function handleToken(apolloClient: any, token: string) {
  setAuthToken(token);
  // const userQueryResponse = await apolloClient.query({ query: userQuery });
  // const { id, locations } = userQueryResponse.data.user.member;
  setMemberId('12345');
}
