export interface GenericComponentProps {
  locationId: string;
  locationTitle: string;
}

export interface PickupMember {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  locations: Location[] | null;
}

export interface Vehicle {
  id: string | null;
  carName: string;
  licensePlate: string;
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
  pickupNotes: string;
  dropOffNotes: string;
  pickupRides: Ride[];
  dropOffRides: Ride[];
}

export interface RideDataOnLocation {
  Location: Location;
}

export interface LocationData {
  Location: Location;
}

export interface Response {
  data: RideDataOnLocation;
}

export interface TableData {
  status: string;
  type: string;
  student: string;
  driver: string;
  carName: string;
  licensePlate: string;
  pickupRangeStart: string;
  pickupRangeEnd: string;
}

export interface DriverData {
  allMembers: Member[];
}

interface MemberLocationData {
  member: Member;
}

export interface MemberLocationResponse {
  data: MemberLocationData;
}
