export interface PickupMember {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Member {
  id: string;
  firstName: string | null;
}

export interface Vehicle {
  id: string | null;
  carName: string | null;
}

export interface Shift {
  id: string;
  vehicles: Vehicle[];
  members: Member[];
}

export interface Route {
  id: string;
  shift: Shift;
}

export interface Ride {
  id: string;
  status: string;
  pickupRangeStart: string;
  pickupRangeEnd: string;
  pickupMember: PickupMember;
  type: string | undefined;
  date: string | undefined;
  route: Route;
}

export interface Location {
  id: string;
  title: string;
  pickupRides: Ride[];
  dropOffRides: Ride[];
}

export interface Data {
  Location: Location;
}

export interface Response {
  data: Data;
}

export interface TableData {
  date: string;
  type: string;
  student: string;
  pickupRangeStart: string;
  pickupRangeEnd: string;
}
