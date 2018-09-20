import { addDays, isAfter } from 'date-fns';

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
