import moment from 'moment';
import React from 'react';
import { Icon } from 'antd';
import { TableData, Ride } from '../types';

export function filterTimes(rides: TableData[], timeFilter: string) {
  let returnVal: TableData[] = rides;
  if (timeFilter === 'morning') {
    returnVal = rides.filter(ride => Number(ride.pickupRangeStart.slice(0, 2)) < 12);
  } else if (timeFilter === 'afternoon') {
    returnVal = rides.filter(ride => Number(ride.pickupRangeStart.slice(0, 2)) > 12);
  }
  return returnVal;
}

export function compressRide(ride: Ride, type: string) {
  const { id, pickupRangeStart, pickupRangeEnd, route, status } = ride;
  let driver: string | null = 'N/A';
  let carName: string | null = 'N/A';
  let licensePlate: string | null = 'N/A';
  // This isn't ideal -- would like to replace with optional chaining if possible
  if (route) {
    if (route.shift) {
      if (route.shift.members) {
        console.log(route.shift.members[0]);
        driver = `${route.shift.members[0].firstName} ${route.shift.members[0].lastName}`;
      }
      if (route.shift.vehicles) {
        carName = route.shift.vehicles[0].carName;
        licensePlate = route.shift.vehicles[0].licensePlate;
      }
    }
  }
  const student = `${ride.pickupMember.firstName} ${ride.pickupMember.lastName}`;
  const startTime = moment(pickupRangeStart).format('HH:mm');
  const endTime = moment(pickupRangeEnd).format('HH:mm');
  const date = moment(pickupRangeStart).format('YYYY-MM-DD');
  return {
    id,
    status,
    date,
    type,
    student,
    pickupRangeStart: startTime,
    pickupRangeEnd: endTime,
    carName,
    licensePlate,
    driver,
  };
}

export function outputRideType(type: string) {
  const direction = type === 'Pickup' ? 'arrow-up' : 'arrow-down';
  const color = type === 'Pickup' ? '#ffdb7a' : '#089111';
  return (
    <div>
      <div>
        <Icon type={direction} style={{ color, fontSize: '32px' }} />
      </div>
      <div>{type}</div>
    </div>
  );
}
